import circleInValueData from './circleInValue.json';
import { initializeChart, settingDoughnutSize } from '../chart.shared';
import type { Chart } from 'chart.js';
function initializeOptions(el: HTMLElement) {
	const { offsetWidth } = el;
	const defaultCenterFontSize = 48;
	const doughnutPointer = {
		id: 'doughnutPointer',
		afterDatasetsDraw(chart: Chart) {
			const {
				ctx,
				data,
				chartArea: { top, width, height },
			} = chart;

			ctx.save();

			const value = data.datasets[0]!.data[0];
			const x = width / 2;
			const halfFontSize = defaultCenterFontSize / 4; // line height の分だけ下げる
			const y = (top + height) / 2 + halfFontSize;

			ctx.font = `bold ${defaultCenterFontSize}px sans-selif`;
			ctx.fillStyle = ' #fff';
			ctx.textAlign = 'center';
			ctx.fillText(value ? value + '%' : 'None', x, y);
		},
	};

	return {
		type: 'doughnut',
		data: {
			datasets: circleInValueData,
		},
		plugins: [doughnutPointer],
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: {
					display: false,
				},
				title: {
					display: false,
				},
				tooltip: {
					enabled: false,
				},
			},
		},
	};
}

export function initializeCircleInValueChart(target: HTMLCanvasElement) {
	const chartEl = target.getContext('2d') as CanvasRenderingContext2D;
	const baseOptions = initializeOptions(target);

	// console.log('chart start', baseOptions);
	settingDoughnutSize(target.parentElement);
	let chart = initializeChart(chartEl, baseOptions);

	window.addEventListener('resize', () => {
		if (!chart) return;
		chart.destroy();
		const options = initializeOptions(target);
		settingDoughnutSize(target.parentElement);
		chart = initializeChart(chartEl, options);
	});
}

window.addEventListener('DOMContentLoaded', () => {
	const charts = [].slice.call(document.querySelectorAll('[data-chart-id="circleInValue"]'));
	charts.forEach((chart: HTMLCanvasElement) => {
		initializeCircleInValueChart(chart);
	});
});
