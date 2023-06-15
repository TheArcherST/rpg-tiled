import Entity from "../../entity.js";
import Default from "./states/default.js";
import Coordinates from "../../coordinates.js";


export default class Camera extends Entity {
	constructor(coordinates, boundedEntity, sizeX, sizeY) {
		super(coordinates);
		this.sizeX = sizeX;
		this.sizeY = sizeY;
		this.boundedEntity = boundedEntity;
		this.state = new Default();
	}

	draw(ctx) {
	}

	getDrawAreaInfo() {
		let res = new Map();
		let startY = this.coordinates.y - Math.floor(this.sizeY / 2);
		let startX = this.coordinates.x - Math.floor(this.sizeX / 2);

		for (let y = startY;
			 y <= this.coordinates.y + Math.floor(this.sizeY / 2); y++) {
			for (let x = startX;
				 x <= this.coordinates.x + Math.floor(this.sizeX / 2); x++) {

				res.set(
					new Coordinates(
						x-this.coordinates.x + Math.floor(this.sizeX / 2),
						y-this.coordinates.y + Math.floor(this.sizeY / 2)
					),
					new Coordinates(x, y),

				)
			}
		}

		return res;
	}
}