import Game from "./game.js";
import GameBuilder from "./game_builder.js";
import Hero from "./entities/hero/hero.js";
import Coordinates from "./Coordinates.js";



function createGame() {
	const tileSize = 32;
	let tileMap = new GameBuilder(tileSize);
	let entities = tileMap.createEntities();
	let hero = tileMap.createHero();
	return new Game(tileSize, entities, hero);
}


function main() {
	const game = createGame();
	const canvas = document.getElementById('game');
	const ctx = canvas.getContext('2d');

	window.addEventListener('keydown', (event) => {
		game.handleInput(game, event);
	})
	window.addEventListener('keyup', (event) => {
		game.handleInput(game, event);
	})

	game.run(ctx, 60);
}

main()
