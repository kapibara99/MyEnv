/* eslint-disable */

import sampleJSON from './json/sample.json';

class Tournament {
	root: HTMLElement;
	json: unknown;
	constructor(root: HTMLElement, json: Object = sampleJSON) {
		this.root = root;
		this.json = json;
	}

	initialize() {}
	checkDisplayLogic(targetArray: any[], targetElement: HTMLElement) {
		if (targetArray.length === 0) {
			targetElement.style.display = 'none';
		}
	}

	showTournamentList() {
		const targetCanvas = this.root.querySelector('canvas');
	}
}
