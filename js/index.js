import Game from "./Game.js";

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const tileSize = 32;

// const tileMap = new TileMap(tileSize);

const game = new Game(tileSize)
function gameStart() {

	game.update();
	game.draw(ctx);

	//tileMap.draw(canvas, ctx);

}

window.addEventListener('keydown', (event) => {
	//console.log(event.code);
	game.handleInput(event);
})

window.addEventListener('keyup', (event) => {
	//console.log(event.code);
	game.handleInput(event);
})

setInterval(gameStart, 100);

