import { hoge } from './test.js';

export function setupCounter(element: HTMLButtonElement) {
	let counter = 0;
	const setCounter = (count: number) => {
		counter = count;
		element.innerHTML = `count is ${counter}`;
	};
	element.addEventListener('click', () => {
		setCounter(counter + 1);
		hoge();
	});
	setCounter(0);
}
