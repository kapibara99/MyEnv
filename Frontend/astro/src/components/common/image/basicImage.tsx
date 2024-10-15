import styles from './image.module.scss';

export type imageProps = {
	src: string | ImageMetadata;
	alt: string;
	width: number;
	height: number;
};

// like Image astro:assets astro独自コンポーネントをできるだけ再現するのみ
export const AstroBasicImage = (props: imageProps) => (
	<img src={props.src as string} alt={props.alt} width={props.width == 0 ? undefined : props.width} height={props.height == 0 ? undefined : props.height} loading="lazy" decoding="async" />
);

// blur
export const BlurImage = (props: imageProps) => {
	return (
		<div className={styles.imageContainer}>
			<AstroBasicImage {...props} />
			<div className={styles.imageContainer__blur} />
		</div>
	);
};

// thumbnail samples
export const ThumbnailSample = (props: imageProps) => <img src={props.src as string} alt={props.alt} width={props.width} height={props.height} loading="lazy" decoding="async" />;
