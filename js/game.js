import Hero from "./entities/hero/hero.js";
import Coordinates from "./coordinates.js";
import Entity, {CollisionResult, PhantomEntity} from "./entity.js";
import {coordsMapF} from "./entities/hero/states/run.js";


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


export function getCoordSourcePos(coord, areaInfo) {
	let res = null;
	let n = 0;
	Array.from(areaInfo.keys()).forEach(i => {
		if (i.x === coord.x && i.y === coord.y) {
			res = Array.from(areaInfo.values())[n];
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
		camera,
		score,
		menu,
	) {
		this.tileSize = tileSize;
		this.entities = entities;
		this.hero = hero;
		this.builder = builder;
		this.camera = camera;
		this.score = score;
		this.menu = menu;
		this.entities.push(this.hero, this.score, this.menu, this.camera);
		this.currentScale = 1;
	}

	updateScreenMatching(ctx) {
		let needWidth = this.camera.sizeX * this.tileSize;
		if (window.innerWidth > 800) {
			needWidth *= 2;
		}
		let actualWidth = needWidth * this.currentScale;
		const diffCoff = Math.floor(window.innerWidth / actualWidth);
		ctx.scale(diffCoff, diffCoff);
		this.currentScale *= diffCoff;
	}

	draw(ctx) {
		this.updateScreenMatching(ctx);
		let old = ctx.imageSmoothingEnabled;
		ctx.imageSmoothingEnabled = false;
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		let drawAreaInfo = this.camera.getDrawAreaInfo(this);
		this.entities.forEach(entity => {
			if (entity.isVisible === false) {
				return;
			}
			if (entity instanceof Entity) {
				let coord = getCoordTargetPos(entity.coordinates, drawAreaInfo);
				if (coord !== null) {
					let old = entity.coordinates;
					entity.coordinates = coord;
					entity.draw(ctx);
					entity.coordinates = old;
				}
			} else if (entity instanceof PhantomEntity) {
				entity.draw(ctx);
			} else {
				throw Error(entity);
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
		this.checkIsWin();
	}

	checkIsWin() {
		if (this.score.isWin()) {
			this.menu.notifyWin();
		}
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
			if (val.isVisible !== true) {
				return;
			}
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

	notifyKeyPick() {
		if (!this.score.isBagFilled()) {
			this.score.notifyBagIncrease();
			return true;
		} else {
			return false;
		}
	}

	notifyWin() {
		this.menu.notifyWin();
	}

	#getOffset(el) {
		const rect = el.getBoundingClientRect();
		return {
			left: rect.left + window.scrollX,
			top: rect.top + window.scrollY
		};
	}

	normalizePageCoordinates(coordinates) {
		let canvasPos = this.#getOffset(document.getElementById("game"));
		coordinates = Object.assign({}, coordinates);
		coordinates.x -= canvasPos.left;
		coordinates.y -= canvasPos.top;
		coordinates.x /= this.tileSize * this.currentScale;
		coordinates.y /= this.tileSize * this.currentScale;
		coordinates = coordsMapF(coordinates, Math.floor);
		let drawAreaInfo = this.camera.getDrawAreaInfo(this);
		return  getCoordSourcePos(coordinates, drawAreaInfo);
	}
}
