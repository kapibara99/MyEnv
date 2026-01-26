export type ImageContent = {
	name: string;
	path: string;
	pathList?: string[];
	description: string;
	owner: 'bride' | 'groom' | 'ALL';
	imageDate: string; // 日付処理不可。 2025/6月下旬 などの不確定なものも入れる想定のため。
	tags: string[];
	imageSize?: 'middle-row' | 'large-row' | 'middle-col' | 'large-col';
};

export type ImageContentArray = Array<ImageContent>;
