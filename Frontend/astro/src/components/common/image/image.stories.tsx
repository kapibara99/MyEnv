export default {
	title: 'Components/Atoms/Image',
	args: {
		src: 'https://placehold.jp/200x200.png',
		width: 200,
		height: 200,
		alt: 'image alt',
	},
};

type imageProps = {
	src: string;
	alt: string;
	width: number;
	height: number;
};
// like Image astro:assets astro独自コンポーネントをできるだけ再現
export const AstroBasicImage = (args: imageProps) => <img src={args.src} alt={args.alt} width={args.width} height={args.height} loading="lazy" decoding="async" />;
