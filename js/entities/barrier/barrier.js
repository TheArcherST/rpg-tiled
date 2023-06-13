import Entity, {CollisionResult} from "../../entity.js";


export default class Barrier extends Entity {
	constructor(image, coordinates, tileSize) {
		super(coordinates);
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
		return CollisionResult.NO_WAY;
	}
}