import Coordinates from "./Coordinates.js";
import State from "./State.js";

export default class Entity{
	coordinates = new Coordinates();
	state = new State();

	update(){}
	draw(){}
	handleInput(event){
		state = this.state.handleInput(this, event);
	}
}