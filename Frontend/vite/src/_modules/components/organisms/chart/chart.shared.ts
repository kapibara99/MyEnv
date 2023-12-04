import { Chart as ChartJS } from 'chart.js';
import type { Chart } from 'chart.js';
// export type ChartType = 'line' | 'vertical-bar' | 'horizontal-bar' | 'circle' | 'circle-in-value';

export function initializeChart(target: HTMLCanvasElement, options: any, updateData?: (chart?: Chart) => void) {
	let chart = new ChartJS(target, options);

	window.addEventListener('resize', () => {
		updateData && updateData();
		chart.resize();
	});
}

export const initialOption = {
	options: {
		responsive: true,
		maintainAspectRatio: false,
	},
};
