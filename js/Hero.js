export default class Hero {
	constructor(tileSize) {
		this.tileSize = tileSize;
		this.heroImg = new Image();
		this.heroImg.src = "./img/tiles/map.png";
	}
}