# A minimal web map client
The source code for the project is in the ./src directory
the build and minified version is ./dist/picomap.js (UMD) and ./dist/picomap-es.js (ES).

## How to use it
Add a div in your project with id="map". In addition add the following script to your project: `<script src="https://unpkg.com/picomap/dist/picomap.js"></script>`

### Example
index.html:
```
<!DOCTYPE html>
<html lang="en">
  <head>
  </head>
  <body>
    <div id="map"></div>
    <script src="https://unpkg.com/picomap/dist/picomap.js"></script>
    <script src="./index.js"></script>
  </body>
</html>
```
index.js:
```
const mapInstance = new Picomap();
mapInstance.initialize();
```

Picomap accepts the following attributes, none of which are required:
- height: number (pixels)
- width: number (pixels)
- latitude: number (-85.06-85.06)
- longitude: number (-180-180)
- zoom: number (0-19)