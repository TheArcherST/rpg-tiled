import {PhantomEntity} from "../../entity.js";
import Default from "./states/default.js";


export default class MushroomsSpawner extends PhantomEntity {
	constructor(possibleCoordinates) {
		super(new Default(possibleCoordinates));
	}
}