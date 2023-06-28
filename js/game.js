import Hero from "./entities/hero/hero.js";
import Coordinates from "./coordinates.js";
import {CollisionResult} from "./entity.js";


export function getCoordTargetPos(coord, areaInfo) {
	let res = null;
	let n = 0;
	Array.from(areaInfo.values()).forEach(i => {
		if (i.x === coord.x && i.y === coord.y) {
			res = Array.from(areaInfo.keys())[n];
			return null;
		}
		n++;
	})
	return res;
}


export function getExtremeCoordinates(allCoordinates) {
	let baseCoord  = allCoordinates[0];
	let maxX, maxY, minX, minY;
	maxX = baseCoord.x;
	minX = baseCoord.x;
	maxY = baseCoord.y;
	minY = baseCoord.y;

	allCoordinates.forEach(i => {
		if (maxX < i.x) {
			maxX = i.x;
		}
		if (maxY < i.y) {
			maxY = i.y;
		}
		if (minX > i.x) {
			minX = i.x;
		}
		if (minY > i.y) {
			minY = i.y;
		}
	})
	return [new Coordinates(minX, minY), new Coordinates(maxX, maxY)];
}


export default class Game {
	constructor(
		tileSize,
		entities,
		hero,
		builder,
		spawner,
		camera,
	) {
		this.tileSize = tileSize;
		this.entities = entities;
		this.hero = hero;
		this.builder = builder;
		this.spawner = spawner;
		this.camera = camera;
	}

	draw(ctx) {
		let old = ctx.imageSmoothingEnabled;
		ctx.imageSmoothingEnabled = false;
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		let drawAreaInfo = this.camera.getDrawAreaInfo(this);
		[...this.entities, this.hero].forEach(entity => {
			if ("coordinates" in entity) {
				let coord = getCoordTargetPos(entity.coordinates, drawAreaInfo);
				if (coord !== null) {
					let old = entity.coordinates;
					entity.coordinates = coord;
					entity.draw(ctx);
					entity.coordinates = old;
				}
			}
		});
		ctx.imageSmoothingEnabled = old;
	}

	handleInput(game, event) {
		this.hero.handleInput(game, event);
	}

	update(ticks) {
		this.entities.forEach(element => {
			element.update(this, ticks);
		})
		this.hero.update(this, ticks);
		this.spawner.update(this, ticks);
		this.camera.update(this, ticks);
	}

	run(ctx, update_rate) {
		let ticks = 2;
		let start = new Date();
		this.update(ticks);
		this.draw(ctx);
		let end = new Date();
		let diff = end-start;
		setTimeout(() => {this.run(ctx, update_rate)}, 1000/update_rate - diff)
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
		this.entities.push(entity);
	}
}