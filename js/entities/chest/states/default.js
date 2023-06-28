import State from "../../../state.js";
import {CollisionResult} from "../../../entity.js";
import Coordinates from "../../../coordinates.js";
import {eventsObserver} from "../../../eventsObserver.js";
import FlickeringState from "./flickering.js";


export default class Default extends State {
    constructor() {
        super();
        this.value = 0;
        this.isDiff = false;
    }
    update(game, entity, ticks) {
        if (this.isDiff) {
            this.isDiff = false;
            return new FlickeringState(this, 20, 150);
        }
    }
    resolveCollision(game, entity, invadedEntity) {
        let bag = game.score.getBag();
        game.score.notifyBagClear();
        game.score.notifyScoreIncrease(bag);
        if (bag > 0) {
            this.value += bag;
            this.isDiff = true;
            return CollisionResult.UNION;
        } else {
            return CollisionResult.NO_WAY;
        }
    }
}
