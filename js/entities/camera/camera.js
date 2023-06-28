import Entity from "../../entity.js";
import Default from "./states/default.js";
import Coordinates from "../../coordinates.js";


export default class Camera extends Entity {
	constructor(coordinates, boundedEntity, sizeX, sizeY) {
		super(coordinates, new Default());
		this.sizeX = sizeX;
		this.sizeY = sizeY;
		this.boundedEntity = boundedEntity;
	}

	draw(ctx) {
	}

	getDrawAreaInfo(game, offset=new Coordinates(0, 0)) {
		let res = new Map();
		let startY = this.coordinates.y - Math.floor(this.sizeY / 2);
		let startX = this.coordinates.x - Math.floor(this.sizeX / 2);

		for (let y = startY;
			 y <= this.coordinates.y + Math.floor(this.sizeY / 2); y++) {
			for (let x = startX;
				 x <= this.coordinates.x + Math.floor(this.sizeX / 2); x++) {

				res.set(
					new Coordinates(
						x-this.coordinates.x + Math.floor(this.sizeX / 2) + offset.x,
						y-this.coordinates.y + Math.floor(this.sizeY / 2) + offset.y
					),
					new Coordinates(x, y),

				)
			}
		}
		return res;
	}
}