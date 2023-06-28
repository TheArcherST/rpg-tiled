import State from "../../../state.js";
import {CollisionResult} from "../../../entity.js";
import Coordinates from "../../../coordinates.js";
import {eventsObserver, Event} from "../../../eventsObserver.js";
import Key  from "../../key/key.js"


export default class Default extends State {
	constructor(possibleCoordinates) {
		super();
		this.possibleCoordinates = possibleCoordinates;
		this.counter = 0;
	}

	update(game, entity, ticks) {
		this.counter++;
		if (this.counter > 100) {
			this.counter = 0;
			// todo:
			//this.#spawn(game);
		}
	}

	#spawn(game) {
		const randomIndex = Math.floor(Math.random() * this.possibleCoordinates.length);
		const randomCoordinate = this.possibleCoordinates[randomIndex];
		game.spawnEntity(game.builder.createMushroom(randomCoordinate));
	}
}