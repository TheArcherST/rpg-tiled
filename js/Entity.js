import Coordinates from "./Coordinates.js";
import State from "./State.js";

export default class Entity{
	coordinates = new Coordinates();
	state = new State();

	constructor(coordinates){
		this.coordinates=coordinates;
	}

	update(){}
	draw(ctx){}
	handleInput(event){
		state = this.state.handleInput(this, event);
	}
}