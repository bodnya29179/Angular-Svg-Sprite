# Angular SVG Sprite

## The aim
The project aims to generate an SVG sprite that enables us to achieve the following objectives:

- Optimize the use of SVG files through the creation of an SVG icon component;
- Allow the editing of SVG files without losing their functionality when using the `<img/>` tag.
- Automatically regenerate the SVG sprite when icons are added, edited, or removed, and the app is running.
- Reduce the number of HTTP requests when fetching icons from the assets folder by using a service for loading SVG icons.

## Installation

Run the commands:
* `npm install svg-sprite --save-dev`
* `npm install onchange --save-dev`

## Steps
### 1. Creating the svg-sprite generation script:
- Script file: [generate-svg-sprite.js](scripts/generate-svg-sprite.js).

Where:
- `ICONS_PATH` is the path where your svg-icons are located;
- `SVG_SPRITE_PATH` is the path where your generated sprite will be located;
- `SVG_SPRITE_FILENAME` is the name of the sprite that you want to save.

### 2. Creating the services that work with sprite:
- Sprite loader service: [sprite-loader.service.ts](src/app/shared/services/sprite-loader/sprite-loader.service.ts);
- Svg service: [svg.service.ts](src/app/shared/services/svg/svg.service.ts).

### 3. Creating the svg-icon component:
- Svg icon component: [svg-icon.component.ts](src/app/shared/components/svg-icon/svg-icon.component.ts).

### 4. Adding the commands to `package.json`:
- `start` allows us to <ins>**generate the svg-sprite**</ins> when we run our app & <ins>**run the app**</ins>:
    ```json
    "start": "npm run generate-sprite && ng serve && npm run watch-sprite"
    ```

- `build` allows us to <ins>**prepare the svg-sprite before making the app build**</ins> & <ins>**build the app**</ins>:
    ```json
    "build": "npm run generate-sprite && ng build"
    ```

- `generate-sprite` allows us to <ins>**generate the svg-sprite file**</ins> by running the script:
    ```json
    "generate-sprite": "node scripts/generate-svg-sprite.js"
    ```

- `watch-sprite` allows us to <ins>**listen the svg-icon changes during the running of app**</ins> (adding/editing/removing icons, etc.) & <ins>**regenerate the sprite build**</ins>: 
    ```json
    "watch-sprite": "onchange \"./src/assets/icons/**/*.svg\" --initial --kill -- npm run generate-sprite"
    ```

### 5. Adding svg-icons to the `assets` folder.
### 6. Using the svg-icon component:
Adding icons to template:
```html
<svg-icon [src]="<your-icon-name-here>"></svg-icon>
```

Changing icon styles (optional):
```scss
svg-icon::ng-deep {
  svg path {
    fill: <some-color-here>;
  }
}
```
or
```scss
svg-icon::ng-deep {
  svg path {
    stroke: <some-color-here>;
  }
}
```

The usage of `fill` or `stroke` depends on the `<path>` type in the svg file.
