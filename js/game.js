import Hero from "./entities/hero/hero.js";
import Coordinates from "./coordinates.js";
import {CollisionResult} from "./entity.js";


export default class Game {
	constructor(tileSize, entities, hero, builder, spawner) {
		this.tileSize = tileSize;
		this.entities = entities;
		this.hero = hero;
		this.builder = builder;
		this.spawner = spawner;
	}

	draw(ctx) {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		this.entities.forEach(element => {
			element.draw(ctx);
			//console.log(element);
		});
		this.hero.draw(ctx);
	}

	handleInput(game, event) {
		this.hero.handleInput(game, event);
	}

	update() {
		this.entities.forEach(element => {
			element.update(this);
		})
		this.hero.update(this);
		this.spawner.update(this);
	}

	run(ctx, update_rate) {
		setInterval(() => {
			this.update()
			this.draw(ctx)
		}, 1000/update_rate);
	}

	getEntitiesAt(coordinates) {
		let result = [];
		this.entities.forEach(val => {
			if (val.coordinates.x === coordinates.x && val.coordinates.y === coordinates.y) {
				result.push(val)
			}
		})
		return result;
	}

	resolveCollision(entity, coordinates) {
		let collisionWith = this.getEntitiesAt(coordinates);
		let isUnion = true;
		collisionWith.forEach(i => {
			let result = i.resolveCollision(this, entity);
			if (result === CollisionResult.UNION) {
			} else if (result === CollisionResult.NO_WAY) {
				isUnion = false;
				return null;
			}
		})

		if (isUnion) {
			return CollisionResult.UNION;
		} else {
			return CollisionResult.NO_WAY;
		}
	}

	destroyEntity(entity) {
		const index = this.entities.indexOf(entity);
		entity.destroy(this);
		this.entities.splice(index, 1);
	}

	spawnEntity(entity) {
		// todo: move events observer subscribe on this level
		this.entities.push(entity);
	}
}