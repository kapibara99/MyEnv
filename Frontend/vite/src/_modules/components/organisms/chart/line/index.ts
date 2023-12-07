import lineData from './line.json';
import { HTMLLegendClassNames, activatedTooltipOptions, initializeChart, initializeHTMLLegend } from '../chart.shared';

function initializeOptions(el: HTMLElement) {
	return {
		type: 'line',
		data: {
			labels: ['January', 'February', 'March', 'April', 'May'],
			datasets: lineData,
		},
		plugins: [initializeHTMLLegend(el.parentElement!)],
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				htmlLegend: {
					// ID of the container to put the legend in
					containerID: 'legend-container',
				},
				legend: {
					display: false,
				},
				title: {
					display: false,
				},
				tooltip: activatedTooltipOptions(),
			},
		},
	};
}

export function initializeLineChart(target: HTMLCanvasElement) {
	const chartEl = target.getContext('2d') as CanvasRenderingContext2D;
	const baseOptions = initializeOptions(target);

	console.log('chart start', target.getBoundingClientRect());
	let chart = initializeChart(chartEl, baseOptions);

	window.addEventListener('resize', () => {
		if (!chart) return;
		let hiddenIndexAry = chart.legend ? Object.assign({}, chart).legend?.legendItems?.filter(v => v.hidden) ?? [] : [];
		chart.destroy();
		const options = initializeOptions(target);
		chart = initializeChart(chartEl, options);

		if (hiddenIndexAry.length) {
			hiddenIndexAry.forEach(v => {
				const el = (target.parentElement?.querySelector(`.${HTMLLegendClassNames.button}:nth-of-type(${v.datasetIndex ? v.datasetIndex + 1 : 1})`) as HTMLButtonElement) ?? null;
				if (el) el.click();
			});
			hiddenIndexAry = [];
		}
	});
}

window.addEventListener('DOMContentLoaded', () => {
	const charts = [].slice.call(document.querySelectorAll('[data-chart-id="line"]'));
	charts.forEach((chart: HTMLCanvasElement) => {
		initializeLineChart(chart);
	});
});
