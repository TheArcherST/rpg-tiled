import Entity from "./Entity.js";
export default class Barier extends Entity {
	constructor(image, coordinates, tileSize) {
		super(coordinates);
		this.tileSize = tileSize;
		this.playerImg = image;
		// this.playerImg.src = "./img/tiles/player.png";

	}

	draw(ctx) {
		ctx.drawImage(this.playerImg, this.coordinates.x * this.tileSize, this.coordinates.y * this.tileSize, this.tileSize, this.tileSize);
		//console.log("barier print")
	}
}