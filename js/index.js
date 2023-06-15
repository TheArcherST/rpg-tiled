import Game from "./game.js";
import GameBuilder from "./gameBuilder.js";
import Hero from "./entities/hero/hero.js";
import Coordinates from "./coordinates.js";
import Road from "./entities/road/road.js";



function createGame() {
	const tileSize = 32;
	let builder = new GameBuilder(tileSize);
	let entities = builder.createEntities();
	let hero = builder.createHero(new Coordinates(7, 7));
	let roadCoordinates = [];
	entities.forEach(i => {
		if (i instanceof Road) {
			roadCoordinates.push(i.coordinates);
		}
	})
	let spawner = builder.createMushroomSpawner(roadCoordinates);
	let camera = builder.createCamera(hero.coordinates, hero, 20, 20);
	return new Game(tileSize, entities, hero, builder, spawner, camera);
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
