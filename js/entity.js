import State from "./state.js";


export const CollisionResult = {
	UNION: 'UNION',
	NO_WAY: 'NO_WAY',
}


export class PhantomEntity {
	constructor(initialState) {
		this.state = initialState;
	}

	update(game, ticks) {
		this.state.update(game, this, ticks);
	}

	draw(ctx) { }

	handleInput(game, event) {
		let state = this.state.handleInput(game, this, event);

		if (state !== undefined) {
			console.log(state);
			this.state.exit(game, this);
			this.state = state;
			state.enter(game, this);
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
