export default class Stay extends State{
	handleInput(entity, event){
		switch(event){
			case 'keyW':
				return new Run('up');
				break;
			case 'keyS':
				return new Run('down');
				break;
			case 'keyA':
				return new Run('left');
				break;
			case 'keyD':
				return new Run('right');
				break;
		}
	}
	
	update(entity){
		
	}
}