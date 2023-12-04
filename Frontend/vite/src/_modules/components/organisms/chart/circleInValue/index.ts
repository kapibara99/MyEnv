import { Chart as ChartJS } from 'chart.js';
import type { Chart } from 'chart.js';

import circleInValueData from './circleInValue.json';
import { initialOption, initializeChart } from '../chart.shared';

const options = {
	...initialOption,
	type: 'radialGauge',
	datasets: circleInValueData,
};

window.addEventListener('DOMContentLoaded', () => {
	initializeChart(document.getElementById('chart') as HTMLCanvasElement, options);
});
