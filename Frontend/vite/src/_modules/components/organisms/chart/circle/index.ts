import { Chart as ChartJS } from 'chart.js';
import type { Chart } from 'chart.js';

import circleData from './circle.json';
import { initialOption, initializeChart } from '../chart.shared';

const options = {
	...initialOption,
	type: 'pie',
	datasets: circleData,
};

window.addEventListener('DOMContentLoaded', () => {
	initializeChart(document.getElementById('chart') as HTMLCanvasElement, options);
});
