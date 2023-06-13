import Entity, {CollisionResult} from "../../entity.js";
import Laying from "./states/laying.js";


export default class Mushroom extends Entity {
	constructor(image, coordinates, tileSize) {
		super(coordinates, new Laying());
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
}