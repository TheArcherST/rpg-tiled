import State from "../../../state.js";


export default class Default extends State {
	constructor() {
		super();
	}

	update(game, entity) {
		if (!("boundedEntity" in entity)) {
			throw Error("Camera entity must have an extra attr boundedEntity");
		}
		entity.coordinates = entity.boundedEntity.coordinates;
	}
}