const relLat = lat => ((1 -Math.log(Math.tan((lat * Math.PI / 180) / 2 + Math.PI / 4)) /Math.PI) /2)
const relLon = lon => ((lon + 180) / 360)

export const nTiles = length => Math.ceil((length/2 - 128) / 256)+1;
export const lon2tile = (lon, zoom) => Math.floor(relLon(lon) * 2 ** zoom);
export const lat2tile = (lat, zoom) => Math.floor(relLat(lat) * 2 ** zoom);

export const tileOffset = (z, lon, lat) => {
  const pixels = 256 * 2**z;
  return {
    x: Math.floor(relLon(lon) * pixels) % 256,
    y: Math.floor(relLat(lat) * pixels) % 256
  };
}

export const createElement = (tag) => document.createElement(tag);