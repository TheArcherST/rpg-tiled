import Game from "./Game.js";

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const tileSize = 32;

// const tileMap = new TileMap(tileSize);

const game = new Game(tileSize)
function gameStart() {
	game.draw(ctx);
	//tileMap.draw(canvas, ctx);

}

setInterval(gameStart, 1000 / 60);

