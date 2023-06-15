import State from "../../../state.js";
import Run from "./run.js";

export default class Stay extends State {
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
		}

		return new Run(
			direction,
			0.3,
			Object.assign({}, entity.coordinates),
		);
	}

	update(game, entity) {

	}
}