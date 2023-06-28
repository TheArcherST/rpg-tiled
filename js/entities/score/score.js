import {CollisionResult, PhantomEntity} from "../../entity.js";
import Default from "./states/default.js";
import Coordinates from "../../coordinates.js";


export default class Score extends PhantomEntity {
	constructor() {
		super(new Default(0));
	}

	draw(ctx) {
		let e = document.getElementById("score_value");
		e.innerText = this.state.score;
	}
}
