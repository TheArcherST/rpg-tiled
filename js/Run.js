export default class Run extends State {

	constructor(direction) {
		this.direction = direction;
	}
	update(entity) {
		switch (direction) {
			case 'up':
				entity.coordinates.y -= 1;
				break;
			case 'down':
				entity.coordinates.y += 1;
				break;
			case 'left':
				entity.coordinates.x -= 1;
				break;
			case 'right':
				entity.coordinates.x += 1;
				break;
		}
	}
}