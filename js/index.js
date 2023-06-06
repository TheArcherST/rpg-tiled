import Game from "./Game.js";


function main() {
	const canvas = document.getElementById('game');
	const ctx = canvas.getContext('2d');
	const tileSize = 32;

	const game = new Game(tileSize)
	setInterval(game.update, 1000 / 60);
	setInterval(game.draw, 1000 / 60);
}


main()
