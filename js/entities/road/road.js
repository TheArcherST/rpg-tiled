import Entity from "../../entity.js";
export default class Road extends Entity {
	constructor(image, coordinates, tileSize) {
		super(coordinates);
		this.tileSize = tileSize;
		this.Img = image;
	}

	draw(ctx) {
		ctx.drawImage(this.Img, this.coordinates.x * this.tileSize, this.coordinates.y * this.tileSize, this.tileSize, this.tileSize);
	}
}