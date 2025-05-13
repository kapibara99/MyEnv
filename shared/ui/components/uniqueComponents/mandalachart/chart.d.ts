export type CellZahyou = [number, number];

export type CellType = 'item' | 'subTitle' | 'title';
export type MandalaCellProps = {
	cellType: CellType;
	isFocused: boolean;
	value: string;
	zahyou: CellZahyou;
};
