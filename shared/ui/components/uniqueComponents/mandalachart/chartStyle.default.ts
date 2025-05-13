export const DEFAULT_BG_COLOR = '#ffffff';
export const DEFAULT_FONT_COLOR = '#000000';
export const fontSizes = ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl'] as const;
export const textAligns = ['text-left', 'text-center', 'text-right'] as const;
export const fontFamilies = ['font-sans', 'font-serif', 'font-mono'] as const;
export type ChartStyle = {
	fontSize: (typeof fontSizes)[number];
	textAlign: (typeof textAligns)[number];
	fontFamily: (typeof fontFamilies)[number];
};
export const DEFAULT_STYLE: ChartStyle = {
	fontSize: 'text-base',
	textAlign: 'text-left',
	fontFamily: 'font-sans',
};

export function createChartStyleValue(style: ChartStyle): string {
	return Object.entries(style)
		.map(([, value]) => value)
		.join(' ') as string;
}

export const defaultWidthSize = 'max-w-[1200px] w-4/5 mx-auto';
