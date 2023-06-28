import Entity, {CollisionResult} from "../../entity.js";
import Default from "./states/default.js";


export default class Score extends Entity {
	constructor(image, coordinates, tileSize) {
		super(coordinates, new Default());
	}

	draw(ctx) {
		ctx.drawImage(
			this.playerImg,
			this.coordinates.x * this.tileSize,
			this.coordinates.y * this.tileSize,
			this.tileSize,
			this.tileSize
		);
	}
}