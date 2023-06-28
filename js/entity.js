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
		let state = this.state.update(game, this, ticks);
		if (state instanceof State) {
			this.state.exit(game, this);
			this.state = state;
			state.enter(game, this);
		}
	}

	draw(ctx) { }

	handleInput(game, event) {
		let state = this.state.handleInput(game, this, event);

		if (state !== undefined) {
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
		this.isVisible = true;
	}

	resolveCollision(game, invadedEntity) {
		return this.state.resolveCollision(game, this, invadedEntity);
	}
}
