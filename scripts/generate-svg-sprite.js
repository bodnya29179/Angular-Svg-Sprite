const fs = require('fs');
const path = require('path');
const SvgSpriter = require('svg-sprite');

const ICONS_PATH = 'src/assets/icons';
const SVG_SPRITE_PATH = 'src/assets/sprite';
const SVG_SPRITE_FILENAME = 'svg-sprite.svg';

const spriter = new SvgSpriter({
  /* Main output directory */
  dest: SVG_SPRITE_PATH,
  mode: {
    view: {},
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

const svgFiles = getSvgFiles(ICONS_PATH);

/* Add SVG files to sprite */
svgFiles.forEach(svgFile => {
  const svgPath = path.relative(ICONS_PATH, svgFile);

  spriter.add(
    svgPath,
    path.basename(svgFile),
    fs.readFileSync(svgFile, { encoding: 'utf-8' }),
  );
});

/* Compile the sprite */
spriter.compile((error, result, data) => {
  const destFolder = path.dirname(path.join(spriter.config.dest, SVG_SPRITE_FILENAME));

  /* Create the destination folder if it doesn't exist */
  fs.mkdir(destFolder, { recursive: true }, (error) => {
    if (error) { throw error; }

    /* Write the generated sprite to folder */
    fs.writeFile(
      path.join(spriter.config.dest, SVG_SPRITE_FILENAME),
      result.view.sprite.contents,
      (err) => { if (err) throw err; },
    );
  });
});
