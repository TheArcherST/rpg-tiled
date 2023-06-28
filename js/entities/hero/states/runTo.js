import State from "../../../state.js";
import Stay from "./stay.js";
import {CollisionResult} from "../../../entity.js";
import Coordinates from "../../../coordinates.js";
import {coordsSum, coordsSub, coordsMapF, maximizeOffset} from "./run.js";


export default class RunTo extends State {
	constructor(
		targetPosition,
		speed=1,
		initialCoordinates,
	) {
		super();
		this.targetPosition = targetPosition;
		this.speed = speed;
		this.offset =  new Coordinates(0,0);
		this.initialCoordinates = initialCoordinates;
		this.cameraPosition = null;
	}
	handleInput(game, entity, event) {
		if (event.type === 'mouseup') {
			return new Stay();
		} else if (event.type === 'mousemove') {
			this.targetPosition = game.normalizePageCoordinates(
				new Coordinates(event.pageX, event.pageY)
			);
		}
	}

	update(game, entity, ticks) {
		let cameraPositionDiff = coordsSub(this.cameraPosition, game.camera.coordinates);
		this.cameraPosition = Object.assign({}, game.camera.coordinates);
		this.targetPosition = coordsSub(this.targetPosition, cameraPositionDiff);
		console.log(cameraPositionDiff);
		let currentOffset = Object.assign({}, this.offset);
		let diff = coordsSub(this.targetPosition, entity.coordinates);
		let absDiff = coordsMapF(coordsSub(this.targetPosition, entity.coordinates), Math.abs);
		let totalParts = absDiff.x + absDiff.y;
		if (totalParts === 0) {
			return;
		}
		let partWeight = ticks*this.speed / totalParts;
		currentOffset.x += diff.x * partWeight;
		currentOffset.y += diff.y * partWeight;

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
		this.cameraPosition = Object.assign({}, game.camera.coordinates);
	}
}