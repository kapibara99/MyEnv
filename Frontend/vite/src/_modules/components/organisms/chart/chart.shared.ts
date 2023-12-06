import {
	Chart as ChartJS,
	// ChartType,
	// Plugin,
	BarController,
	BarElement,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarController,
	BarElement,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
);

// export type ChartType = 'line' | 'vertical-bar' | 'horizontal-bar' | 'circle' | 'circle-in-value';

export function initializeChart(target: CanvasRenderingContext2D | HTMLCanvasElement | null, options: any) {
	if (!target) return;
	let chart = new ChartJS(target, options);
	return chart;
}

