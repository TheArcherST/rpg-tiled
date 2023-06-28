import State from "../../../state.js";
import {CollisionResult} from "../../../entity.js";
import Coordinates from "../../../coordinates.js";
import {eventsObserver} from "../../../eventsObserver.js";


export default class Default extends State {
    constructor() {
        super();
    }
    update(game, entity, ticks) {
    }
    resolveCollision(game, entity, invadedEntity) {
        return CollisionResult.NO_WAY;
    }
}
