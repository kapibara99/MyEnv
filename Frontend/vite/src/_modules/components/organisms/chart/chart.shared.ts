import {
	Chart as ChartJS,
	// ChartType,
	// Plugin,
	ArcElement,
	BarController,
	BarElement,
	CategoryScale,
	DoughnutController,
	LineElement,
	LineController,
	LinearScale,
	PointElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
ChartJS.register(
	ArcElement,
	BarController,
	BarElement,
	CategoryScale,
	DoughnutController,
	LineElement,
	LineController,
	LinearScale,
	PointElement,
	Title,
	Tooltip,
	Legend,
);
import type { Chart, ChartConfiguration, PluginOptionsByType } from 'chart.js';

// export type ChartType = 'line' | 'vertical-bar' | 'horizontal-bar' | 'circle' | 'circle-in-value';

// chartを初期化する
export function initializeChart(target: CanvasRenderingContext2D | HTMLCanvasElement | null, options: any) {
	if (!target) return;
	let chart = new ChartJS(target, options);
	return chart;
}

// 円形チャートなど、正方形の際に幅が飛び出る場合は親最大幅で正方形を保つ
export function settingDoughnutSize(canvasWrapperEl: HTMLElement | null) {
	if (!canvasWrapperEl) return;
	const { offsetWidth } = canvasWrapperEl;
	const parentWidth = canvasWrapperEl.parentElement!.offsetWidth ?? offsetWidth; // wrapperの外側のwidth
	// console.log(parentWidth, offsetWidth);

	if (parentWidth < offsetWidth) {
		canvasWrapperEl.style.width = `${parentWidth}px`;
		canvasWrapperEl.style.height = `${parentWidth}px`;
	}
}

/*
========================================
HTML Legend Plugin
https://tr.you84815.space/chartjs/configuration/legend.html
========================================
*/
export const HTMLLegendClassNames = {
	container: 'a-c-o-chart-legend',
	list: 'a-c-o-chart-legend__list',
	button: 'a-c-o-chart-legend__item',
	icon: 'a-c-o-chart-legend__icon',
	text: 'a-c-o-chart-legend__text',
	hidden: '-hidden',
};
export function initializeHTMLLegend(wrapperEl: HTMLElement) {
	function getOrCreateLegendList(): HTMLElement | undefined {
		const legendContainer = wrapperEl.querySelector(`.${HTMLLegendClassNames.container}`);
		if (!legendContainer) return;
		let listContainer = legendContainer.querySelector('div');

		if (!listContainer) {
			listContainer = document.createElement('div');
			listContainer.classList.add(HTMLLegendClassNames.list);
			legendContainer.appendChild(listContainer);
		}

		return listContainer;
	}

	const htmlLegendPlugin = {
		id: 'htmlLegend',
		afterUpdate(chart: Chart) {
			const list = getOrCreateLegendList();
			if (!list) return;

			// Remove old legend items
			while (list.firstChild) {
				list.firstChild.remove();
			}

			// Reuse the built-in legendItems generator
			const { legend } = chart.options.plugins as PluginOptionsByType<'line'>;
			const items = legend.labels.generateLabels(chart);
			items.forEach(item => {
				const button = document.createElement('button');
				button.setAttribute('type', 'button');
				button.classList.add(HTMLLegendClassNames.button);
				if (item.hidden) button.classList.add(HTMLLegendClassNames.hidden);
				button.onclick = () => {
					const { type } = chart.config as ChartConfiguration;
					if (type === 'pie' || type === 'doughnut') {
						// Pie and doughnut charts only have a single dataset and visibility is per item
						chart.toggleDataVisibility(item.index as number);
					} else {
						const datasetIndex = item.datasetIndex as number;
						chart.setDatasetVisibility(datasetIndex, !chart.isDatasetVisible(datasetIndex));
					}
					chart.update();
				};

				// Color box
				const iconEl = document.createElement('i');
				iconEl.style.background = item.fillStyle as string;
				iconEl.style.borderColor = item.strokeStyle as string;
				iconEl.style.borderWidth = item.lineWidth + 'px';
				iconEl.classList.add(HTMLLegendClassNames.icon);

				// Text
				const textEl = document.createElement('span');
				textEl.style.color = item.fontColor as string;
				textEl.style.textDecoration = item.hidden ? 'line-through' : '';
				textEl.classList.add(HTMLLegendClassNames.text);

				// append data
				const text = document.createTextNode(item.text);
				textEl.appendChild(text);
				button.appendChild(iconEl);
				button.appendChild(textEl);
				list.appendChild(button);
			});
		},
	};

	return htmlLegendPlugin;
}
