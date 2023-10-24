const R = 6378137;
const PI = Math.PI;
const C = 2 * PI * R;

export const nTiles = length => Math.ceil((length/2 - 128) / 256);
export const lon2tile = (lon, zoom) => Math.floor(((lon + 180) / 360) * 2 ** zoom);
export const lat2tile = (lat, zoom) => Math.floor(((1 -Math.log(Math.tan((lat * PI / 180) / 2 + PI / 4)) /PI) /2) * 2 ** zoom);
export const createElement = (tag) => document.createElement(tag);

export const tileOffset = (z, lon, lat) => {
  let pixels = 256 * 2**z;
  let cordy = (C / 2 - R * Math.log(Math.tan((lat * PI / 180) / 2 + PI / 4))) / C;
  return {x: parseInt(((lon + 180) / 360) * pixels) % 256, y: parseInt(cordy * pixels) % 256};
}
