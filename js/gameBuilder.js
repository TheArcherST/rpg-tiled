import Coordinates from "./coordinates.js";
import Barrier from "./entities/barrier/barrier.js";
import Road from "./entities/road/road.js";
import Hero from "./entities/hero/hero.js";
import Key from "./entities/key/key.js";
import MushroomsSpawner from "./entities/mushroomsSpawner/mushroomsSpawner.js";
import Camera from "./entities/camera/camera.js";
import Score from "./entities/score/score.js";


export default class GameBuilder {
	constructor(tileSize) {
		this.tileSize = tileSize;

		this.heroImg = new Image();
		this.heroImg.src = './img/tiles/hero.png'

		this.barrierImg = new Image();
		this.barrierImg.src = "./img/tiles/barrier1.png";

		this.roadImg = new Image();
		this.roadImg.src = "./img/tiles/road.png";

		this.mushrromImg = new Image();
		this.mushrromImg.src = "./img/tiles/key.png";
	}

	createEntities(rawEntities) {
		let entities = [];
		rawEntities.forEach(i => {
			let coordinates = new Coordinates(i.coordinates.x, i.coordinates.y);
			let e;
			switch (i.type) {
				case 'road':
					e = this.createRoad(coordinates)
					break;
				case 'wall':
					e = this.createWall(coordinates);
					break;
				case 'hole':
					e = this.createWall(coordinates);
					break;
				case 'unstable_road':
					e = this.createRoad(coordinates);
					break;
				case 'spawn':
					// e = this.createHero(coordinates);
					break;
				case 'endpoint':
					e = this.createWall(coordinates);
					break;
				case 'key':
					e = this.createMushroom(coordinates);
					break;
			}
			if (e) {
				entities.push(e);
			}
		})
		return entities;
	}

	createHero(coordinates) {
		return new Hero(
			coordinates,
			this.heroImg,
			this.tileSize
		);
	}

	createMushroom(coordinates) {
		return new Key(
			this.mushrromImg,
			coordinates,
			this.tileSize,
		)
	}

	createMushroomSpawner(possibleCoordinates) {
		return new MushroomsSpawner(possibleCoordinates);
	}

	createCamera(coordinates, boundedEntity, sizeX, sizeY) {
		return new Camera(coordinates, boundedEntity, sizeX, sizeY);
	}

	createRoad(coordinates) {
		return new Road(this.roadImg, coordinates, this.tileSize);
	}

	createWall(coordinates) {
		return new Barrier(this.barrierImg, coordinates, this.tileSize);
	}

	createScore() {
		return new Score();
	}
}
