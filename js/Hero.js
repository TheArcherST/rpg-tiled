import Entity from "./Entity";

export default class Hero extends Entity {
	
	constructor(tileSize) {
		this.tileSize = tileSize;
		this.heroImg = new Image();
		this.heroImg.src = "./img/tiles/map.png";
	}

	
}