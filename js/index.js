import TileMap from "./TileMap.js";
import Hero from "./Hero.js";

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const tileSize = 32;

const tileMap = new TileMap(tileSize);

function game() {
	
	tileMap.draw(canvas, ctx);
}

setInterval(game, 1000 / 60);

