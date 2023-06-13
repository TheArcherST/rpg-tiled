import State from "./state.js";


export const CollisionResult = {
	UNION: 'UNION',
	NO_WAY: 'NO_WAY',
}


export default class Entity {
	constructor(coordinates) {
		this.coordinates = coordinates;
		this.state = new State();
	}

	update(game) {
		this.state.update(game, this);
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

	resolveCollision(game, invadedEntity) { return CollisionResult.UNION; }
}