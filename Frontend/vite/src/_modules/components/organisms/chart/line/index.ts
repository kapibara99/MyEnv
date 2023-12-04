import { Chart as ChartJS } from 'chart.js';
import type { Chart } from 'chart.js';

import lineData from './line.json';
import { initialOption, initializeChart } from '../chart.shared';

const options = {
	...initialOption,
	type: 'line',
	datasets: lineData,
};

window.addEventListener('DOMContentLoaded', () => {
	initializeChart(document.getElementById('chart') as HTMLCanvasElement, options);
});
