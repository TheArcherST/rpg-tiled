import TileMap from "./TileMap.js";
import Hero from "./Hero.js";
import Coordinates from "./Coordinates.js";

export default class Game {

	entities = [];
	heroImg = new Image();
	//image, coordinates, tileSize

	constructor(tileSize) {

		let tile = new TileMap(tileSize);
		this.entities = tile.createEntities();
		//console.log(this.entities);
		this.tileSize = tileSize;
		this.heroImg.src = "./img/tiles/player.png";
		this.hero = new Hero(this.heroImg, new Coordinates(7, 7), this.tileSize);
	}

	draw(ctx) {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		this.entities.forEach(element => {
			element.draw(ctx);
			console.log(element);
		});
		this.hero.draw(ctx);

	}
	update() {

	}
}