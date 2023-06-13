import State from "./state.js";
import {eventsObserver} from "./eventsObserver.js";


export const CollisionResult = {
	UNION: 'UNION',
	NO_WAY: 'NO_WAY',
}


export class PhantomEntity {
	constructor(state=new State()) {
		this.state = state;
		eventsObserver.subscribe(this);  // todo: unsubscribe
	}

	update(game) {
		this.state.update(game, this);
		eventsObserver.fetch(this);  // clear events stack is method not had done it itself.
	}

	draw(ctx) { }

	handleInput(game, event) {
		let param = this.state.handleInput(game, this, event);

		if (param !== undefined) {
			this.state.exit(game, this);
			this.state = param;
			param.enter(game, this);
		}
	}

	destroy(game) { }
}


export default class Entity extends PhantomEntity {
	constructor(coordinates, state=new State()) {
		super(state)
		this.coordinates = coordinates;
	}

	resolveCollision(game, invadedEntity) {
		return this.state.resolveCollision(game, this, invadedEntity);
	}
}