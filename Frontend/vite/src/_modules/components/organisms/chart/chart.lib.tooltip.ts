import { TooltipPositionerFunction } from 'chart.js';
import { Tooltip } from 'chart.js';
import type { Chart, ChartType, ScriptableTooltipContext } from 'chart.js';

// 型を拡張
declare module 'chart.js' {
	interface TooltipPositionerMap {
		myCustomPositioner: TooltipPositionerFunction<ChartType>;
	}
}

/*
========================================
Tooltip Custom Position And Styles
https://www.chartjs.org/docs/latest/configuration/tooltip.html#custom-position-modes
https://tr.you84815.space/chartjs/configuration/tooltip.html
========================================
*/

type positionersType = {
	x: number;
	y: number;
};

Tooltip.positioners.myCustomPositioner = (elements: any, eventPosition: any): positionersType | false => {
	const tooltip = document.getElementById('chart-tooltip');
	if (!tooltip || !elements.length) return false;
	tooltip.dataset.datasetIndex = elements[0].datasetIndex;

	const tooltipSize = tooltip.clientWidth;
	const tooltipSizeHalf = tooltipSize / 2;
	const positionX = eventPosition.x; // elements[0].element.x;
	// const positionY = eventPosition.y; // elements[0].element.y;
	const defaultY = -50; // Yは固定値で上側に配置
	const centerX = positionX - tooltipSizeHalf;
	// console.log('myCustomPositioner', elements[0].element, eventPosition, positionX, centerX, tooltipSizeHalf);

	if (eventPosition.chart) {
		// 飛び出た分の位置修正
		const rect = eventPosition.chart.canvas.getBoundingClientRect();
		if (centerX + tooltipSize > rect.width) {
			// 右に飛び出る
			// console.log('right');
			tooltip.style.transform = `translateX(-${tooltipSizeHalf}px)`;
		} else if (centerX < 0) {
			// 左に飛び出る
			// console.log('left');
			tooltip.style.transform = `translateX(${Math.abs(tooltipSizeHalf)}px)`;
		} else {
			// console.log('middle');
			tooltip.style.transform = 'translateX(0)';
		}
	}

	return {
		x: centerX,
		y: defaultY,
	};
};
export function activatedTooltipOptions() {
	return {
		enabled: false,
		position: 'myCustomPositioner',
		callbacks: {
			title: (tooltipItems: any) => {
				return tooltipItems[0].label;
			},
			label: (tooltipItems: any) => {
				return `${tooltipItems.dataset.label}: ${tooltipItems.formattedValue}`;
			},
		},
		external: externalTooltipHandler,
	};
}

const getOrCreateTooltip = (chart: Chart) => {
	let tooltipEl: HTMLElement | null = document.getElementById('chart-tooltip');

	if (!tooltipEl) {
		tooltipEl = document.createElement('div');
		tooltipEl.setAttribute('id', 'chart-tooltip');
		tooltipEl.classList.add('a-c-o-chart-tooltip');
		tooltipEl.style.opacity = '1';
		tooltipEl.style.pointerEvents = 'none';
		chart.canvas.parentNode?.appendChild(tooltipEl);
	}

	return tooltipEl;
};

const externalTooltipHandler = (context: ScriptableTooltipContext<'line'>) => {
	// Tooltip Element
	const { chart, tooltip } = context;
	const tooltipEl = getOrCreateTooltip(chart);

	// Hide if no tooltip
	if (tooltip.opacity === 0) {
		tooltipEl.style.opacity = '0';
		return;
	}

	// set caret position
	tooltipEl.classList.remove('above', 'below', 'no-transform');
	if (tooltip.yAlign) {
		tooltipEl.classList.add(tooltip.yAlign);
	} else {
		tooltipEl.classList.add('no-transform');
	}

	// Set Text
	if (tooltip.body) {
		const parentEl = document.createElement('div');

		// heading
		const titleLines = tooltip.title || [];
		titleLines.forEach((title: string) => {
			const el = document.createElement('p');
			const text = document.createTextNode(title);
			el.appendChild(text);
			parentEl.appendChild(el);
		});

		// body value
		const bodyLines = tooltip.body.map((b: any) => b.lines);
		bodyLines.forEach((body: string, i: number) => {
			const colors = tooltip.labelColors[i];

			const span = document.createElement('span');
			span.style.background = colors?.backgroundColor as string;
			span.style.borderColor = colors?.borderColor as string;
			const text = document.createTextNode(body);

			span.appendChild(text);
			parentEl.appendChild(span);
		});

		while (tooltipEl.firstChild) {
			tooltipEl.firstChild.remove();
		}
		// Add new children
		tooltipEl.appendChild(parentEl);
	}

	// Display, position, and set styles for font
	tooltipEl.style.position = 'absolute';
	tooltipEl.style.opacity = '1';
	tooltipEl.style.pointerEvents = 'none';
	tooltipEl.style.backgroundColor = tooltip.labelColors[0]!.backgroundColor as string;

	// setting position
	const { caretX, caretY } = tooltip;
	tooltipEl.style.left = caretX + 'px';
	tooltipEl.style.top = caretY + 'px';
};
