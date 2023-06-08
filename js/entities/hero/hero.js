import Entity from "../../entity.js";
import Stay from "./states/stay.js";


export default class Hero extends Entity {
	constructor(coordinates, image, tileSize) {
		super(coordinates);
		this.tileSize = tileSize;
		this.Img = image;
		this.state = new Stay();
	}

	draw(ctx) {
		ctx.drawImage(this.Img, this.coordinates.x * this.tileSize, this.coordinates.y * this.tileSize, this.tileSize, this.tileSize);
	}
}