const fs = require('fs');
const path = require('path');
const SvgSpriter = require('svg-sprite');

const iconsDir = 'src/assets/icons';
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
const svgFiles = fs.readdirSync(iconsDir).filter((file) => path.extname(file) === '.svg');

/* Add SVG files to sprite */
svgFiles.forEach(svgFile => {
  const svgPath = path.join(iconsDir, svgFile);
  spriter.add(svgPath, svgFile, fs.readFileSync(svgPath, { encoding: 'utf-8' }));
});

/* Compile the sprite */
spriter.compile((error, result, data) => {
  const destFolder = path.dirname(path.join(spriter.config.dest, SVG_SPRITE_FILENAME));

  /* Create the destination folder if it doesn't exist */
  fs.mkdir(destFolder, { recursive: true }, (error) => {
    if (error) { throw error; }

    /* Write the generated sprite to folder */
    fs.writeFile(
      path.join(
        spriter.config.dest, SVG_SPRITE_FILENAME),
        result.view.sprite.contents,
        (err) => { if (err) throw err; },
    );
  });
});
