const fs = require('fs');
const path = require('path');
const SvgSpriter = require('svg-sprite');
const { v4: uuidv4 } = require('uuid');
const { JSDOM } = require('jsdom');

const ICONS_PATH = 'src/assets/icons';
const SVG_SPRITE_PATH = 'src/assets/sprite';
const SVG_SPRITE_FILENAME = 'svg-sprite.svg';

const spriter = new SvgSpriter({
  /* Main output directory */
  dest: SVG_SPRITE_PATH,
  mode: {
    css: {
      render: {
        css: false,
      },
    },
  },
  svg: {
    /* Add namespace token to all CSS class names in SVG shapes */
    namespaceClassnames: false,
  },
});

/* Get list of SVG files in directory */
function getSvgFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach((file) => {
    const isDirectory = fs.statSync(`${ dirPath }/${ file }`).isDirectory();

    if (isDirectory) {
      arrayOfFiles = getSvgFiles(`${ dirPath }/${ file }`, arrayOfFiles);
    } else if (path.extname(file) === '.svg') {
      arrayOfFiles.push(path.join(dirPath, '/', file));
    }
  })

  return arrayOfFiles;
}

/* Generate unique IDs for linearGradients and radialGradients inside SVG files */
function makeUniqueIds(svgContent) {
  /* Parse the SVG string into a DOM object */
  const dom = new JSDOM(svgContent, { contentType: 'image/svg+xml' });
  const document = dom.window.document;
  const svgElement = document.documentElement;

  /* Return the original string if parsing failed */
  if (!svgElement) {
    return svgContent;
  }

  /* Select all linear and radial gradients */
  const gradients = svgElement.querySelectorAll('linearGradient, radialGradient');

  if (gradients.length) {
    const uniqueSuffix = uuidv4();

    gradients.forEach((gradient) => {
      const oldId = gradient.id;
      const newId = oldId + uniqueSuffix;
      gradient.id = newId;
      const elementsWithFill = svgElement.querySelectorAll(`[fill="url(#${oldId})"]`);

      elementsWithFill.forEach((element) => {
        const fillUrl = element.getAttribute('fill');

        if (fillUrl && fillUrl.includes(oldId)) {
          element.setAttribute('fill', `url(#${newId})`);
        }
      });
    });
  }

  /* Serialize the DOM object back to an SVG string */
  return svgElement.outerHTML;
}

const svgFiles = getSvgFiles(ICONS_PATH);

/* Add SVG files to sprite */
svgFiles.forEach((svgFile) => {
  const svgPath = path.relative(ICONS_PATH, svgFile);
  const svgContent = fs.readFileSync(svgFile, { encoding: 'utf-8' });

  spriter.add(
    svgPath,
    path.basename(svgFile),
    makeUniqueIds(svgContent),
  );
});

/* Compile the sprite */
spriter.compile((error, result) => {
  const destFolder = path.dirname(path.join(spriter.config.dest, SVG_SPRITE_FILENAME));

  /* Create the destination folder if it doesn't exist */
  fs.mkdir(destFolder, { recursive: true }, (error) => {
    if (error) { throw error; }

    /* Write the generated sprite to folder */
    fs.writeFile(
      path.join(spriter.config.dest, SVG_SPRITE_FILENAME),
      result.css.sprite.contents,
      (err) => { if (err) throw err; },
    );
  });
});
