import {CollisionResult, PhantomEntity} from "../../entity.js";
import Default from "./states/default.js";
import Coordinates from "../../coordinates.js";


export default class Scoreboard extends PhantomEntity {
	constructor(bagLimit, winScore) {
		super(new Default());
		this.score = 0;
		this.bag = 0;
		this.bagLimit = bagLimit;
		this.winScore = winScore;
	}

	draw(ctx) {
		let score_e = document.getElementById("score_value");
		score_e.innerText = this.score;
		let bag_e = document.getElementById("bag_value");
		bag_e.innerText = this.bag;
		if (this.bag >= this.bagLimit) {
			bag_e.classList.add("flag-bag-limit")
		} else {
			bag_e.classList.remove("flag-bag-limit")
		}
	}

	getBag() {
		return this.bag;
	}

	getScore() {
		return this.score;
	}

	isWin() {
		return this.score >= this.winScore;
	}

	notifyScoreIncrease(on=1) {
		this.score += on;
	}

	isBagFilled() {
		return this.bag >= this.bagLimit;
	}

	notifyBagIncrease() {
		this.bag += 1;
	}

	notifyBagClear() {
		this.bag = 0;
	}
}
