import horizontalBarData from './barHorizontal.json';
import { initializeChart } from '../chart.shared';
import ChartDataLabels, { Context } from 'chartjs-plugin-datalabels'; // https://chartjs-plugin-datalabels.netlify.app/guide/options.html#scriptable-options

const defaultFontSize = 16;
const defaultLabelFontColor = '#333';
const fontColorWhiteList = [
	// 指定された色ではフォントカラーを白とする。それ以外は、default に従う
	'#3A763E',
	'blue',
	'green',
	'#333',
];

function initializeOptions(el: HTMLElement) {
	const { offsetWidth } = el;
	function convertedLimitFontSize(offsetWidth: number) {
		// 最大三文字として、入らない場合はfalseを返す
		return ((defaultFontSize * 2.5) / offsetWidth) * 100;
	}
	console.log(convertedLimitFontSize(offsetWidth), offsetWidth);

	return {
		type: 'bar',
		data: {
			labels: ['Horizontal bar chart'],
			datasets: horizontalBarData,
		},
		plugins: [ChartDataLabels],
		options: {
			indexAxis: 'y',
			responsive: true,
			maintainAspectRatio: false,
			grid: {
				borderWidth: 0,
				display: false,
			},
			animation: {
				duration: 0,
			},
			scales: {
				x: {
					display: false,
					stacked: true, // 積み上げ設定
				},
				y: {
					display: false,
					stacked: true, // 積み上げ設定
				},
			},
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
				datalabels: {
					align: 'center',
					anchor: 'center',
					padding: 0,
					display: (context: Context) => {
						return Number(context.dataset.data[context.dataIndex]) > convertedLimitFontSize(offsetWidth);
					},
					font: {
						size: defaultFontSize,
						weight: 'bold',
					},
					formatter: (value: number) => {
						// display label format
						return `${Math.round(value)}%`;
					},
					color: (context: Context) => {
						// display label font color
						return fontColorWhiteList.includes(String(context.dataset.backgroundColor))
							? 'white'
							: defaultLabelFontColor;
					},
				},
			},
		},
	};
}

export function initializeBarHorizontalChart(target: HTMLCanvasElement) {
	const chartEl = target.getContext('2d') as CanvasRenderingContext2D;
	const baseOptions = initializeOptions(target);

	// console.log('chart start', baseOptions);
	let chart = initializeChart(chartEl, baseOptions);

	window.addEventListener('resize', () => {
		if (!chart) return;
		chart.destroy();
		const options = initializeOptions(target);
		chart = initializeChart(chartEl, options);
	});
}

window.addEventListener('DOMContentLoaded', () => {
	const barHorizontalCharts = [].slice.call(document.querySelectorAll('[data-chart-id="horizontalBar"]'));
	barHorizontalCharts.forEach((chart: HTMLCanvasElement) => {
		initializeBarHorizontalChart(chart);
	});
});
