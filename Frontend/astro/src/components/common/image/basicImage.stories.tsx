import testImage from '../../../assets/image-test.jpg';
import { AstroBasicImage } from './basicImage';

export default {
	title: 'Components/Atoms/Image/AstroBasicImage',
	tags: ['autodocs'],
	component: AstroBasicImage,
	args: {
		// src: 'https://placehold.jp/200x200.png',
		src: testImage,
		width: 250,
		height: 167,
		alt: 'image alt',
	},
};

export const AutoSizeBasicImage = {
	args: {
		width: 0,
		height: 0,
	},
};
