import State from "../../../state.js";
import Stay from "./stay.js";
import {CollisionResult} from "../../../entity.js";
import Coordinates from "../../../coordinates.js";



function modCeil(n) {
	if (n >= 0) {
		return Math.ceil(n);
	} else {
		return Math.floor(n);
	}
}


function maximizeOffset(offset) {
	return new Coordinates(
		modCeil(offset.x), modCeil(offset.y)
	)
}


function coordsSum(coord1, coord2) {
	return new Coordinates(
		coord1.x + coord2.x,
		coord1.y + coord2.y
	);
}


export default class Run extends State {
	constructor(
		direction,
		speed=1,
		initialCoordinates,
	) {
		super();
		this.direction = direction;
		this.speed = speed;
		this.offset =  new Coordinates(0,0);
		this.initialCoordinates = initialCoordinates;
	}
	handleInput(game, entity, event) {
		if (event.type === "keyup") {
			return new Stay();
		}
	}

	update(game, entity) {
		let currentOffset = Object.assign({}, this.offset);

		switch (this.direction) {
			case 'up':
				currentOffset.y -= this.speed;
				break;
			case 'down':
				currentOffset.y += this.speed;
				break;
			case 'left':
				currentOffset.x -= this.speed;
				break;
			case 'right':
				currentOffset.x += this.speed;
				break;
		}

		let maximizedOffset = maximizeOffset(currentOffset);
		let currentCoordinate = coordsSum(this.initialCoordinates, maximizedOffset);
		let collisionResult = game.resolveCollision(this, currentCoordinate);
		if (collisionResult === CollisionResult.UNION) {
			this.offset = currentOffset;
			entity.coordinates = currentCoordinate;
		}
	}

	enter(game, entity) {
		this.update(game, entity);
	}
}