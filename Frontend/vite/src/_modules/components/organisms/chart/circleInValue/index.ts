import circleInValueData from './circleInValue.json';
import { initializeChart } from '../chart.shared';

const options = {
	type: 'radialGauge',
	data: {
		labels: [],
		datasets: circleInValueData,
	},
};

window.addEventListener('DOMContentLoaded', () => {
	// initializeChart(document.getElementById('chart') as HTMLCanvasElement, options);
});

