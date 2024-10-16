import { ThumbnailSample } from './basicImage';

export default {
	title: 'Components/Atoms/Image/Thumbnail',
	tags: ['autodocs'],
	component: ThumbnailSample,
	args: {
		src: 'https://placehold.jp/800x300.png',
		width: 8,
		height: 3,
		alt: 'image alt',
	},
};

export { ThumbnailSample };
export const AutoSizeThumbnail = {
	args: {
		width: 0,
		height: 0,
	},
};
