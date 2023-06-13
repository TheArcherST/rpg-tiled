import State from "../../../state.js";
import {CollisionResult} from "../../../entity.js";
import Coordinates from "../../../coordinates.js";
import {eventsObserver, Event} from "../../../eventsObserver.js";

export default class Laying extends State {
	constructor() {
		super();
	}

	resolveCollision(game, entity, invadedEntity) {
		game.destroyEntity(entity);
		return super.resolveCollision(game, entity, invadedEntity);
	}
}