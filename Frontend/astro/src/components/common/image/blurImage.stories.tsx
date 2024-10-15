import testImage from '../../../assets/image-test.jpg';
import { BlurImage } from './basicImage';

export default {
	title: 'Components/Atoms/Image/BlurImage',
	tags: ['autodocs'],
	component: BlurImage,
	args: {
		src: testImage,
		width: 0,
		height: 0,
		alt: 'image alt',
	},
};

export { BlurImage };
