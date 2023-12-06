import verticalBarData from './barVertical.json';
import { initializeChart } from '../chart.shared';

const options = {
	type: 'bar',
	data: {
		labels:[],
		datasets: verticalBarData,
	},
};

window.addEventListener('DOMContentLoaded', () => {
	// initializeChart(document.getElementById('chart') as HTMLCanvasElement, options);
});
