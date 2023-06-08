import State from "./state.js";


export default class Entity {
	constructor(coordinates) {
		this.coordinates = coordinates;
		this.state = new State();
	}

	update() {
		this.state.update(this);
	}

	draw(ctx) { }

	handleInput(event) {
		let param = this.state.handleInput(this, event);

		if (param !== undefined) {
			this.state.exit(this);
			this.state = param;
			param.enter(this);
		}
	}
}