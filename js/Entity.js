import Coordinates from "./Coordinates.js";
import State from "./State.js";

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
		console.log(event);
		console.log(this.state);
		if (param != undefined) {
			this.state = this.state.handleInput(this, event);
		}
	}
}