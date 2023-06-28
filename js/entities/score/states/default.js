import State from "../../../state.js";
import {CollisionResult} from "../../../entity.js";
import Coordinates from "../../../coordinates.js";
import {eventsObserver, Event} from "../../../eventsObserver.js";

export default class Default extends State {
	constructor(initialScore) {
		super();
		this.score = initialScore;
	}

	notifyScoreIncrease() {
		this.score += 1;
	}
}