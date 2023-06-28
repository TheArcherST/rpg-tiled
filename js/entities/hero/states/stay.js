import State from "../../../state.js";
import Run from "./run.js";
import Coordinates from "../../../coordinates.js";
import RunTo from "./runTo.js";


export default class Stay extends State {
	handleInput(game, entity, event) {
		let direction = null;
		let targetPosition = null;
		if (event.type === 'keydown') {
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
			}
		} else if (event.type === 'mousedown') {
			targetPosition =  game.normalizePageCoordinates(
				new Coordinates(event.pageX, event.pageY)
			);
			if (targetPosition !== null) {
				return new RunTo(
					targetPosition,
					0.10,
					Object.assign({}, entity.coordinates),
				)
			}
		}
		if (direction !== null) {
			return new Run(
				[direction],
				0.10,
				Object.assign({}, entity.coordinates),
			);
		}
	}

	update(game, entity, ticks) {

	}
}