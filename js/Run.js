import State from "./State.js";
import Stay from "./Stay.js";
export default class Run extends State {

	constructor(direction) {
		super();
		this.direction = direction;
	}
	handleInput(entity, event) {
		if (event.type == "keyup")
			return new Stay();
		// console.log("ewer");
		// switch (event.code) {
		// 	case 'KeyW':
		// 		return new Run('up');
		// 		break;
		// 	case 'KeyS':
		// 		return new Run('down');
		// 		break;
		// 	case 'KeyA':
		// 		return new Run('left');
		// 		break;
		// 	case 'KeyD':
		// 		return new Run('right');
		// 		break;
		// }
	}


	update(entity) {
		console.log(entity);
		switch (this.direction) {
			case 'up':
				entity.coordinates.y -= 1;
				break;
			case 'down':
				entity.coordinates.y += 1;
				break;
			case 'left':
				entity.coordinates.x -= 1;
				break;
			case 'right':
				entity.coordinates.x += 1;
				break;
		}
	}
}