import Hero from "./entities/hero/hero.js";
import Coordinates from "./Coordinates.js";


export default class Game {
	constructor(tileSize, entities, hero) {
		this.tileSize = tileSize;
		this.entities = entities;
		this.hero = hero;
	}

	draw(ctx) {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		this.entities.forEach(element => {
			element.draw(ctx);
			//console.log(element);
		});
		this.hero.draw(ctx);

	}

	handleInput(event) {
		this.hero.handleInput(event);
	}

	update() {
		this.entities.forEach(element => {
			element.update();
		})
		this.hero.update();
	}

	run(ctx, update_rate) {
		setInterval(() => {
			this.update()
			this.draw(ctx)
		}, 1000/update_rate);
	}
}