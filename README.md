# A minimal web map client
Picomap is a hyperminimalist map client without any dependencies written in native JS.
The source code for the project is in the ./src directory

## How to use the map
Add a div in your project with id="map". In addition add the following script to your project: `<script src="https://unpkg.com/picomap/dist/picomap.js"></script>`

### Minimal example
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
| Name   | Type | Default Value | Accepted values | Description
| -------- | ------- | ------ | --- | --- |
| height  | number   | 500 | | Height of the map |
| width | number    | 500 | | Width of the map|
| lat    | number   | 60.5 | -85.06-85.06 | Latitude for the map centre |
| lon | number | 24.4391 | -180-180| Longitude for the map centre |
| zoom | number | 10 | 0-19 | Initial zoom level
|id  | string | "map" | | Id of the map's div|
| source | string | "https://tile.openstreetmap.org" || Source for the raster tiles|

## Building from source
1. Clone the git library: `https://github.com/leoalho/picomap.git`
2. Install dependecies: `npm install`
3. Build the files: `npm run build`\
This will build three different files to to ./dist directory.

## Using with npm
The library is possible to install with npm by running `npm install picomap`. The files for the library are as specified in the las section. Both ES import and CommonJS require syntax should work.