import lineData from './line.json';
import { initializeChart } from '../chart.shared';

const options = {
	type: 'line',
	data: {
		labels: [],
		datasets: lineData,
	},
};

window.addEventListener('DOMContentLoaded', () => {
	// initializeChart(document.getElementById('chart') as HTMLCanvasElement, options);
});
