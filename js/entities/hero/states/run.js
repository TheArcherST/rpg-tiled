import State from "../../../state.js";
import Stay from "./stay.js";


export default class Run extends State {
	constructor(
		direction,
		speed=1,
		startPosition
	) {
		super();
		this.direction = direction;
		this.speed = speed;
		this.startPosition = startPosition;
	}
	handleInput(entity, event) {
		if (event.type === "keyup") {
			return new Stay();
		}
	}

	update(entity) {
		switch (this.direction) {
			case 'up':
				this.startPosition.y -= this.speed;
				break;
			case 'down':
				this.startPosition.y += this.speed;
				break;
			case 'left':
				this.startPosition.x -= this.speed;
				break;
			case 'right':
				this.startPosition.x += this.speed;
				break;
		}

		entity.coordinates.x = Math.round(this.startPosition.x);
		entity.coordinates.y = Math.round(this.startPosition.y);
	}

	enter(entity) {
		this.update(entity);
	}
}