import Coordinates from "./coordinates.js";
import Barrier from "./entities/barrier/barrier.js";
import Road from "./entities/road/road.js";
import Hero from "./entities/hero/hero.js";
import Mushroom from "./entities/mushroom/mushroom.js";
import MushroomsSpawner from "./entities/mushroomsSpawner/mushroomsSpawner.js";
import Camera from "./entities/camera/camera.js";


export default class GameBuilder {
	constructor(tileSize) {
		this.tileSize = tileSize;

		this.heroImg = new Image();
		this.heroImg.src = './img/tiles/player.png'

		this.barrierImg = new Image();
		this.barrierImg.src = "./img/tiles/barrier.png";

		this.roadImg = new Image();
		this.roadImg.src = "./img/tiles/road.png";

		this.mushrromImg = new Image();
		this.mushrromImg.src = "./img/tiles/mushroom.png";
	}

	map = [
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
		[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
		[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
		[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
		[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
		[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
		[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
		[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
		[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
		[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
		[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
		[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
		[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
		[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
		[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
		[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	]

	createEntities() {
		let entities = [];

		for (let i = 0; i < this.map.length; i++) {
			for (let j = 0; j < this.map[i].length; j++) {
				let coordinates = new Coordinates(j, i);

				switch (this.map[i][j]) {
					case 0:
						entities.push(new Barrier(this.barrierImg, coordinates, this.tileSize));
						break;
					case 1:
						entities.push(new Road(this.roadImg, coordinates, this.tileSize));
						break;
				}
			}
		}

		[new Coordinates(2, 2), new Coordinates(3, 2)].forEach(coordinates => {
			entities.push(new Mushroom(this.mushrromImg, coordinates, this.tileSize))
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
		return new Mushroom(
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
}
