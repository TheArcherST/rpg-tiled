import State from "./State.js";
import Run from "./Run.js";

export default class Stay extends State {
	handleInput(entity, event) {
		console.log("ewer");
		switch (event.code) {
			case 'KeyW':
				return new Run('up');
				break;
			case 'KeyS':
				return new Run('down');
				break;
			case 'KeyA':
				return new Run('left');
				break;
			case 'KeyD':
				return new Run('right');
				break;
		}
	}

	update(entity) {

	}
}