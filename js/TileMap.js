import Coordinates from "./Coordinates.js";
import Barier from "./Barier.js";
import Road from "./Road.js";


export default class TileMap {


	constructor(tileSize) {
		this.tileSize = tileSize;
		this.barierImg.src = "./img/tiles/barier.png";
		this.roadImg.src = "./img/tiles/road.png";

	}

	// redBlock = 'rgba(255,0,0,0.3)';
	// blueBlock = 'rgba(0,0,255,0.3)';
	// tileSize = 0;
	map = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],]


	barierImg = new Image();
	roadImg = new Image();

	createEntities() {

		let entities = [];
		for (let i = 0; i < this.map.length; i++) {
			for (let j = 0; j < this.map[i].length; j++) {
				switch (this.map[i][j]) {
					case 0:
						entities.push(new Barier(this.barierImg, new Coordinates(j, i), this.tileSize));
						break;
					case 1:
						entities.push(new Road(this.roadImg, new Coordinates(j, i), this.tileSize));
						break;
				}
			}

		}
		return entities;
	}
}
	// draw(canvas, ctx) {
	// 	this.#drawMap(ctx);
	// 	this.#drawHero(ctx);
	// 	this.#createMask(ctx);
	// 	// this.#rectangle(ctx, this.redBlock, 0, 0, 32, 32);
	// }

	// #drawMap(ctx) {
	// 	this.mapImg = new Image();
	// 	this.mapImg.src = "./img/tiles/map.png";
	// 	ctx.drawImage(this.mapImg, 0, 0);
	// }
	// #drawHero(ctx) {
	// 	this.playerImg = new Image();
	// 	this.playerImg.src = "./img/tiles/player.png";
	// 	ctx.drawImage(this.playerImg, 0, 0, this.tileSize, this.tileSize);
	// }

	// #createMask(ctx) {
	// 	for (let i = 0; i < 20; i++) {
	// 		for (let j = 0; j < 20; j++) {
	// 			switch (this.map[i][j]) {
	// 				case 0:
	// 					this.#rectangle(ctx, this.redBlock, j * this.tileSize, i * this.tileSize, this.tileSize, this.tileSize);
	// 					break;
	// 				case 1:
	// 					this.#rectangle(ctx, this.blueBlock, j * this.tileSize, i * this.tileSize, this.tileSize, this.tileSize);
	// 					break;

	// 			}
	// 		}
	// 	}

	// }

	// #rectangle(ctx, color, x, y, width, height) {
	// 	ctx.fillStyle = color;
	// 	ctx.fillRect(x, y, width, height);
	// }

// }