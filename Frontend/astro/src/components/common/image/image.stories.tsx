import { AstroBasicImage, blurImage, thumbnailSample } from './basicImage';

export default {
	title: 'Components/Atoms/Image',
	tags: ['autodocs'],
	args: {
		src: 'https://placehold.jp/200x200.png',
		// src:testingImage.src,
		width: 200,
		height: 200,
		alt: 'image alt',
	},
};

export { AstroBasicImage, blurImage, thumbnailSample };
