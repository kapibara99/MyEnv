import { atom } from 'jotai';
import { DEFAULT_BG_COLOR, DEFAULT_FONT_COLOR, DEFAULT_STYLE, createChartStyleValue } from './chartStyle.default';

export const chartStyleAtom = atom({
	data: DEFAULT_STYLE,
	classValue: createChartStyleValue(DEFAULT_STYLE),
});

export const chartBgColorAtom = atom(DEFAULT_BG_COLOR);
export const chartFontColorAtom = atom(DEFAULT_FONT_COLOR);

export const chartCellSizeAtom = atom<number | 'auto'>('auto');
