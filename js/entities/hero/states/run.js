import State from "../../../state.js";
import Stay from "./stay.js";
import {CollisionResult} from "../../../entity.js";
import Coordinates from "../../../coordinates.js";



export function modCeil(n) {
	if (n >= 0) {
		return Math.ceil(n);
	} else {
		return Math.floor(n);
	}
}


export function coordsMapF(coordinates, func) {
	return new Coordinates(
		func(coordinates.x), func(coordinates.y)
	);
}

export function maximizeOffset(offset) {
	return coordsMapF(offset, modCeil);
}


export function coordsSum(coord1, coord2) {
	return new Coordinates(
		coord1.x + coord2.x,
		coord1.y + coord2.y
	);
}

export function coordsSub(coord1, coord2) {
	return new Coordinates(
		coord1.x - coord2.x,
		coord1.y - coord2.y
	);
}


export default class Run extends State {
	constructor(
		directions,
		speed=1,
		initialCoordinates,
	) {
		super();
		this.directions = directions;
		this.speed = speed;
		this.offset =  new Coordinates(0,0);
		this.initialCoordinates = initialCoordinates;
	}
	handleInput(game, entity, event) {
		let direction;
		switch (event.code) {
			case 'KeyW':
				direction = 'up';
				break;
			case 'KeyS':
				direction = 'down';
				break;
			case 'KeyA':
				direction = 'left';
				break;
			case 'KeyD':
				direction = 'right';
				break;
			default:
				return undefined;
		}

		if (event.type === "keyup") {
			let index = this.directions.indexOf(direction);
			if (index !== -1) {
				this.directions.splice(index, 1);
			}
			if (this.directions.length === 0) {
				return new Stay();
			}
		} else if (event.type  === "keydown") {
			if (!this.directions.includes(direction)) {
				this.directions.push(direction);
			}
		}
	}

	update(game, entity, ticks) {
		let currentOffset = Object.assign({}, this.offset);

		let direction = this.directions.pop()
		this.directions.unshift(direction)

		switch (direction) {
			case 'up':
				currentOffset.y -= this.speed * ticks;
				break;
			case 'down':
				currentOffset.y += this.speed * ticks;
				break;
			case 'left':
				currentOffset.x -= this.speed * ticks;
				break;
			case 'right':
				currentOffset.x += this.speed * ticks;
				break;
			default:
				throw Error(`Unknown direction ${direction}`)
		}

		currentOffset.x = Math.round(currentOffset.x * 100) / 100;
		currentOffset.y = Math.round(currentOffset.y * 100) / 100;

		let maximizedOffset = maximizeOffset(currentOffset);
		let currentCoordinate = coordsSum(this.initialCoordinates, maximizedOffset);
		let collisionResult = game.resolveCollision(this, currentCoordinate);
		if (collisionResult === CollisionResult.UNION) {
			this.offset = currentOffset;
			entity.coordinates = currentCoordinate;
		}
	}

	enter(game, entity) {
	}
}