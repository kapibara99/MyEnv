import circleData from './circle.json';
import { initializeChart } from '../chart.shared';

const options = {
	type: 'pie',
	data: {
		labels: [],
		datasets: circleData,
	},
};

window.addEventListener('DOMContentLoaded', () => {
	// initializeChart(document.getElementById('chart') as HTMLCanvasElement, options);
});
