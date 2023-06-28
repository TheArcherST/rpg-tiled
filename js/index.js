import Game from "./game.js";
import GameBuilder from "./gameBuilder.js";
import Hero from "./entities/hero/hero.js";
import Coordinates from "./coordinates.js";
import Road from "./entities/road/road.js";



function createGame(rawEntities) {
	const tileSize = 64;
	let builder = new GameBuilder(tileSize);
	let entities = builder.createEntities(rawEntities);
	let hero = builder.createHero(new Coordinates(7, 7));
	let roadCoordinates = [];
	entities.forEach(i => {
		if (i instanceof Road) {
			roadCoordinates.push(i.coordinates);
		}
	})
	let spawner = builder.createMushroomSpawner(roadCoordinates);
	let camera = builder.createCamera(hero.coordinates, hero, 10, 10);
	let score = builder.createScore()
	return new Game(tileSize, entities, hero, builder, spawner, camera, score);
}


function loadAll(entities) {
	const game = createGame(entities);
	const canvas = document.getElementById('game');
	const ctx = canvas.getContext('2d');

	window.addEventListener('keydown', (event) => {
		game.handleInput(game, event);
	})
	window.addEventListener('keyup', (event) => {
		game.handleInput(game, event);
	})

	game.run(ctx, 40);
}

function  main() {

	return fetch("./entities.json")
		.then((res) => res.text())
		.then((text) => {
			let entities = JSON.parse(text);
			return loadAll(entities)
		})
		.catch((e) => console.error(e));
}

main()
