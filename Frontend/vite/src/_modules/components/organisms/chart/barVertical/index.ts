import { Chart as ChartJS } from 'chart.js';
import type { Chart } from 'chart.js';

import verticalBarData from './barVertical.json';
import { initialOption, initializeChart } from '../chart.shared';

const options = {
	...initialOption,
	type: 'bar',
	datasets: verticalBarData,
};

window.addEventListener('DOMContentLoaded', () => {
	initializeChart(document.getElementById('chart') as HTMLCanvasElement, options);
});
