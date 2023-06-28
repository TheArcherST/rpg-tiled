import Entity, {CollisionResult} from "../../entity.js";
import Default from "./states/default.js";


export default class Chest extends Entity {
	constructor(image, coordinates, tileSize) {
		super(coordinates, new Default());
		this.tileSize = tileSize;
		this.playerImg = image;
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

	resolveCollision(game, invadedEntity) {
		return this.state.resolveCollision(game, invadedEntity);
	}
}