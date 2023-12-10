import { Chart as ChartJS, ArcElement, BarController, BarElement, CategoryScale, DoughnutController, LineElement, LineController, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, BarController, BarElement, CategoryScale, DoughnutController, LineElement, LineController, LinearScale, PointElement, Title, Tooltip, Legend);
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
