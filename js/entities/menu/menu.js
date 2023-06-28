import {CollisionResult, PhantomEntity} from "../../entity.js";
import Default from "./states/default.js";
import Coordinates from "../../coordinates.js";


export default class Menu extends PhantomEntity {
	constructor() {
		super(new Default());
		this.isVisible = false;
	}

	draw(ctx) {
		let menu_e = document.getElementById("menu");
		menu_e.classList.remove("hidden");
	}

	notifyWin() {
		this.isVisible = true;
	}
}
