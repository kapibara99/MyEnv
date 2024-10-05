type imageProps = {
	src: string;
	alt: string;
	width: number;
	height: number;
};

// like Image astro:assets astro独自コンポーネントをできるだけ再現するのみ
export const AstroBasicImage = (props: imageProps) => <img src={props.src} alt={props.alt} width={props.width} height={props.height} loading="lazy" decoding="async" />;

// blur
export const blurImage = (props: imageProps) => <img src={props.src} alt={props.alt} width={props.width} height={props.height} loading="lazy" decoding="async" />;

// thumbnail samples
export const thumbnailSample = (props: imageProps) => <img src={props.src} alt={props.alt} width={props.width} height={props.height} loading="lazy" decoding="async" />;
