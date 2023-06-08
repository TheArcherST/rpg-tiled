import Game from "./Game.js";

const tileSize = 32;
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const game = new Game(tileSize)


function update() {
	game.update()
	game.draw(ctx)
}


function main() {
	window.addEventListener('keydown', (event) => {
		game.handleInput(event);
	})
	window.addEventListener('keyup', (event) => {
		//console.log(event.code);
		game.handleInput(event);
	})

	setInterval(update, 100);
}

main()
