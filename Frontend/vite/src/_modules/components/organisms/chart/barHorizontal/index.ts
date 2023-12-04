import { Chart as ChartJS } from 'chart.js';
import type { Chart } from 'chart.js';

import horizontalBarData from './barHorizontal.json';
import { initialOption, initializeChart } from '../chart.shared';

const options = {
	...initialOption,
	type: 'bar',
	datasets: horizontalBarData,
};

window.addEventListener('DOMContentLoaded', () => {
	initializeChart(document.getElementById('chart') as HTMLCanvasElement, options);
});
