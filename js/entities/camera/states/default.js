import State from "../../../state.js";


export default class Default extends State {
	constructor(boundDeviationTolerance=1) {
		super();
		this.tolerance = boundDeviationTolerance
	}

	update(game, entity, ticks) {
		if (!("boundedEntity" in entity)) {
			throw Error("Camera entity must have an extra attr boundedEntity");
		}
		let diffX = entity.coordinates.x - entity.boundedEntity.coordinates.x;
		let diffY = entity.coordinates.y - entity.boundedEntity.coordinates.y;
		if (Math.abs(diffX) > this.tolerance) {
			entity.coordinates.x -= Math.round(diffX / Math.abs(diffX))
		} else if (Math.abs(diffY) > this.tolerance) {
			entity.coordinates.y -= Math.round(diffY / Math.abs(diffY));
		}
	}
}