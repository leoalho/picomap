import { lon2tile, lat2tile, tileOffset } from "./utils.js";

export default class Picomap {
  constructor(height = 500, width = 500, lon = 24.4391, lat = 60.5, zoom = 10) {
    this.height = height;
    this.width = width;
    this.lat = lat;
    this.lon = lon;
    this.zoom = zoom;
    this.map = document.getElementById("map");
    this.map.style = `height: ${this.height}px; width: ${this.width}px; overflow: hidden; transform: translate3d(0px,0px,0px)`;
  }

  #createButton(text, x,y,z, left, top){
    let button = document.createElement("button");
    button.innerText = text;
    button.style = `width: 20px; position: absolute; top: ${top}px; left: ${left}px`;
    button.addEventListener("click", () => this.#move(x,y,z));
    return button
  }

  #createControlLayer() {
    let controlLayer = document.createElement("div");
    controlLayer.style = "height: 100%; width: 100%; position: absolute; top: 0px; left: 0px";
    controlLayer.append(this.#createButton("\u25B2", 0, 0.2, 0, 40, 20)); //Up
    controlLayer.append(document.createElement("br"));
    controlLayer.append(this.#createButton("\u25C0", -0.2, 0, 0, 20, 40)); //Left
    controlLayer.append(this.#createButton("\u25B6", 0.2, 0, 0, 60, 40)); //Right
    controlLayer.append(document.createElement("br"));
    controlLayer.append(this.#createButton("\u25BC", 0, -0.2, 0, 40, 60)); //Down
    controlLayer.append(document.createElement("br"));
    controlLayer.append(this.#createButton("+", 0, 0, 1, 40, 100));
    controlLayer.append(document.createElement("br"));
    controlLayer.append(this.#createButton("-", 0, 0, -1, 40, 120));
    this.map.append(controlLayer);
  }

  #createTile(x, y, z, transX, transY) {
    const tile = document.createElement("img");
    tile.src = `https://tile.openstreetmap.org/${x}/${y}/${z}.png`;
    tile.alt = "";
    tile.style = `width: 256px; height: 256px; opacity: 1; transform: translate3d(${transX}px, ${transY}px, 0px); display: block; position: absolute`;
    return tile;
  }

  #renderTiles() {
    let centerX = lon2tile(this.lon, this.zoom);
    let centerY = lat2tile(this.lat, this.zoom);
    let offset = tileOffset(this.zoom, this.lon, this.lat);
    this.mapLayer.style.transform = `translate3d(${128 - offset.x}px,${128 - offset.y}px,0px)`;
    let noTilesY = Math.floor(this.height / 256);
    let noTilesX = Math.floor(this.width / 256);
    const tiles = [];
    for (let i = -noTilesY; i < noTilesY + 1; i++) {
      for (let j = -noTilesX; j < noTilesX + 1; j++) {
        let transY = ((this.height / 2 - 128) % 256) + i * 256;
        let transX = ((this.width / 2 - 128) % 256) + j * 256;
        tiles.push(this.#createTile(this.zoom, centerX + j, centerY + i, transX, transY));
      }
    }
    this.mapLayer.replaceChildren(...tiles);
  }

  #createMapLayer() {
    this.mapLayer = document.createElement("div");
    this.mapLayer.style = "height: 100%; width: 100%";
    this.#renderTiles();
    this.map.append(this.mapLayer);
  }

  #move(x,y,z){
    this.lon += x;
    this.lat += y;
    this.zoom += z;
    this.#renderTiles();
  }

  initialize() {
    this.#createMapLayer();
    this.#createControlLayer();
  }
}