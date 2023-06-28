import Entity from "../../entity.js";
import Stay from "./states/stay.js";


export default class Hero extends Entity {
	constructor(coordinates, image, tileSize) {
		super(coordinates, new Stay());
		this.tileSize = tileSize;
		this.Img = image;
	}

	draw(ctx) {
		ctx.drawImage(this.Img, this.coordinates.x * this.tileSize, this.coordinates.y * this.tileSize,
			this.tileSize*0.7, this.tileSize);
	}
}