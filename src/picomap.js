import { lon2tile, lat2tile, tileOffset, nTiles, createElement } from "./utils.js";

export default class Picomap {
  constructor(height = 500, width = 500, lon = 24.4391, lat = 60.5, zoom = 10, id="map", source="https://tile.openstreetmap.org") {
    this.height = height;
    this.width = width;
    this.lat = lat;
    this.lon = lon;
    this.zoom = zoom;
    this.source = source
    this.map = document.getElementById(id);
    this.map.style = `height: ${this.height}px; width: ${this.width}px; overflow: hidden; transform: translate3d(0px,0px,0px)`;
  }

  #createButton(text, x,y,z, left, top){
    let button = createElement("button");
    button.innerText = text;
    button.style = `width: 20px; position: absolute; top: ${top}px; left: ${left}px`;
    button.addEventListener("click", () => this.#move(x,y,z));
    return button
  }

  #createControlLayer() {
    let controlLayer = createElement("div");
    controlLayer.style = "height: 100%; width: 100%; position: absolute; top: 0px; left: 0px";
    controlLayer.append(this.#createButton("\u25B2", 0, 1, 0, 40, 20)); //Up
    controlLayer.append(createElement("br"));
    controlLayer.append(this.#createButton("\u25C0", -1, 0, 0, 20, 40)); //Left
    controlLayer.append(this.#createButton("\u25B6", 1, 0, 0, 60, 40)); //Right
    controlLayer.append(createElement("br"));
    controlLayer.append(this.#createButton("\u25BC", 0, -1, 0, 40, 60)); //Down
    controlLayer.append(createElement("br"));
    controlLayer.append(this.#createButton("+", 0, 0, 1, 40, 100));
    controlLayer.append(createElement("br"));
    controlLayer.append(this.#createButton("-", 0, 0, -1, 40, 120));
    this.map.append(controlLayer);
  }

  #createTile(x, y, z, transX, transY) {
    const tile = createElement("img");
    tile.src = `${this.source}/${x}/${y}/${z}.png`;
    tile.alt = "";
    tile.style = `width: 256px; height: 256px; opacity: 1; transform: translate3d(${transX}px, ${transY}px, 0px); display: block; position: absolute`;
    return tile;
  }

  #renderTiles() {
    let centerX = lon2tile(this.lon, this.zoom);
    let centerY = lat2tile(this.lat, this.zoom);
    let offset = tileOffset(this.zoom, this.lon, this.lat);
    this.mapLayer.style.transform = `translate3d(${128 - offset.x}px,${128 - offset.y}px,0px)`;
    const tiles = [];
    for (let i = -nTiles(this.height); i <= nTiles(this.height); i++) {
        for (let j = -nTiles(this.width); j <= nTiles(this.width); j++) {
          console.log(i,j)
          let transY = (this.height / 2 - 128) + i * 256;
          let transX = (this.width / 2 - 128) + j * 256;
          tiles.push(this.#createTile(this.zoom, centerX + j, centerY + i, transX, transY));
        }
    }
    this.mapLayer.replaceChildren(...tiles);
  }

  #createMapLayer() {
    this.mapLayer = createElement("div");
    this.mapLayer.style = "height: 100%; width: 100%";
    this.#renderTiles();
    this.map.append(this.mapLayer);
  }

  #move(x,y,z){
    this.lon += x*360/(Math.pow(2,this.zoom));
    this.lat += y*170.12/(Math.pow(2,this.zoom));
    this.zoom += z;
    this.#renderTiles();
  }

  initialize() {
    this.#createMapLayer();
    this.#createControlLayer();
  }
}