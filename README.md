# Angular SVG Sprite

## Installation

Run the commands:
* `npm install svg-sprite --save-dev`
* `npm install onchange --save-dev`

## Steps
### 1. Create the svg-sprite generation script:
- Script file: [generate-svg-sprite.js](scripts/generate-svg-sprite.js).

Where:
- `ICONS_PATH` is the path where your svg-icons are located;
- `SVG_SPRITE_PATH` is the path where your generated sprite will be located;
- `SVG_SPRITE_FILENAME` is the name of the sprite that you want to save.

### 2. Create the services that work with sprite:
- Sprite loader service: [sprite-loader.service.ts](src/app/shared/services/sprite-loader/sprite-loader.service.ts);
- Svg service: [svg.service.ts](src/app/shared/services/svg/svg.service.ts).

### 3. Create the svg-icon component:
- Svg icon component: [svg-icon.component.ts](src/app/shared/components/svg-icon/svg-icon.component.ts).

### 4. Add the commands to `package.json`:
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

- `watch-sprite` allows us to <ins>**listen the svg-icon changes during the running of app**</ins> (adding/editing/removing icons, etc.) & <ins>**re-generate the sprite build**</ins>: 
    ```json
    "watch-sprite": "onchange \"./src/assets/icons/**/*.svg\" --initial --kill -- npm run generate-sprite"
    ```
