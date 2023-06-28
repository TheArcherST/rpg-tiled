import State from "../../../state.js";
import {CollisionResult} from "../../../entity.js";
import Coordinates from "../../../coordinates.js";
import {eventsObserver} from "../../../eventsObserver.js";


const FlickeringStateValue = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
}


export default class FlickeringState extends State {
    constructor(childState, frequency, lifetime) {
        super();
        this.value = FlickeringStateValue.INACTIVE;
        this.counter = 0;
        this.totalCounter = 0;
        this.frequency = frequency;
        this.lifetime = lifetime;
        this.childState = childState;
    }

    update(game, entity, ticks) {
        this.counter += ticks;
        this.totalCounter += ticks;
        if (this.totalCounter >= this.lifetime) {
            return this.childState;
        }
        if (this.counter >= this.frequency) {
            this.counter = 0;
            switch (this.value) {
                case FlickeringStateValue.INACTIVE:
                    this.value = FlickeringStateValue.ACTIVE;
                    entity.isVisible = true;
                    break;
                case FlickeringStateValue.ACTIVE:
                    this.value = FlickeringStateValue.INACTIVE;
                    entity.isVisible = false;
                    break;
            }
        }
        this.childState.update(game, entity, ticks);
    }
    resolveCollision(game, entity, invadedEntity) {
        return CollisionResult.UNION;
    }

    open() {
        this.value = FlickeringStateValue.ACTIVE;
    }
}
