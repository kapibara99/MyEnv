import sampleJSON from './json/sample.json';

class Tournament {
	root: HTMLElement;
	json: Object;
	constructor(root: HTMLElement, json: Object = sampleJSON) {
		this.root = root;
		this.json = json;
	}
	initialize() {}
	checkDisplayLogic(targetArray:any[], targetElement:HTMLElement) {
		if (targetArray.length === 0) {
			targetElement.style.display = 'none';
			return;
    }
  }
  showTournamentList() {
    const targetCanvas = this.root.querySelector('canvas');
    
  }
}
