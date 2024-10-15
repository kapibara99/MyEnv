import testImage from '../../../assets/image-test.jpg';
import { ThumbnailSample } from './basicImage';

export default {
	title: 'Components/Atoms/Image/Thumbnail',
	tags: ['autodocs'],
	component: ThumbnailSample,
	args: {
		// src: 'https://placehold.jp/200x200.png',
		src: testImage,
		width: 250,
		height: 167,
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
