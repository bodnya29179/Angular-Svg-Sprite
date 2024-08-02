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
- `start` allows us to <ins>**wait for svg-sprite generation and app startup**</ins>, and <ins>**begin monitoring svg file changes to regenerate the sprite as needed**</ins>:
    ```json
    "start": "npm-run-all --parallel serve watch-sprite"
    ```

- `serve` allows us to <ins>**generate the svg-sprite**</ins> and run our app:
    ```json
    "serve": "npm run generate-sprite && ng serve"
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

### 6. Adding the svg-sprite to the `.gitignore` file for not saving it:
```gitignore
# Auto-generated sprites folder
svg-sprite.svg
```

### 7. Using the svg-icon component:
Adding icons to template:
```html
<svg-icon [src]="<your-icon-name-here>"></svg-icon>
```

Changing icon styles (optional):

- Way #1: Changing colors by ::ng-deep.

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
  
- Way #2: Changing colors by font color of the parent element.

  ```svg
  <svg xmlns="http://www.w3.org/2000/svg" ...>
    <!-- fill -->
    <path fill="currentColor" ... />
    <!-- or stroke -->
    <rect stroke="currentColor" ... />
  </svg>
  ```
  and setting the font color in CSS / SCSS / SASS / Less.
  ```scss
  svg-icon {
    color: <some-color-here>;
  }
  ```

The usage of `fill` or `stroke` depends on the `<path>` type in the svg file.

### ✨ New Features: Handling Gradient IDs

During sprite generation, we <ins>ensure that all linear and radial gradient IDs in SVGs are
unique</ins> to prevent conflicts when multiple icons use gradients. This prevents issues with color references when
multiple SVGs are displayed, ensuring that each SVG maintains its intended gradient coloring even if others are added or
removed from the DOM.
