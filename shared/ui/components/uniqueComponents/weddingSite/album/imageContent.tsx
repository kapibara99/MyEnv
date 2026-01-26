import type { MouseEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { ImageModal } from './modal';
import type { ImageContent } from './types';

export function ImageContentElement(props: ImageContent) {
	// modal handle
	const [open, setOpen] = useState(false);
	useEffect(() => {
		if (open) {
			document.body.classList.add('show-modal');
		} else {
			document.body.classList.remove('show-modal');
		}
	}, [open]);
	const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setOpen(!open);
	};

	// image load skeleton
	const imgElementRef = useRef<HTMLImageElement>(null);
	const imageLoadedFlag = imgElementRef.current?.complete && imgElementRef.current?.naturalWidth > 0;
	const [loaded, setLoaded] = useState(imageLoadedFlag);
	useEffect(() => {
		const img = imgElementRef.current;
		if (!img) return;

		const handleLoad = () => setLoaded(true);

		if (img.complete && img.naturalWidth > 0) {
			handleLoad();
		} else {
			img.addEventListener('load', handleLoad);
			return () => {
				img.removeEventListener('load', handleLoad);
			};
		}
	}, []);

	// setting size
	let wrapperStyle = '';
	let containerStyle = 'aspect-square';
	switch (props.imageSize) {
		case 'middle-row':
			wrapperStyle += 'col-span-1 row-span-2';
			containerStyle = 'h-full';
			break;
		case 'middle-col':
			wrapperStyle += 'col-span-2 row-span-2';
			break;
		case 'large-row':
			wrapperStyle += 'col-span-1 row-span-3';
			containerStyle = 'h-full';
			break;
		case 'large-col':
			wrapperStyle += 'col-span-3 row-span-3';
			break;
	}
	return (
		<div className={`${wrapperStyle} album-image-content`}>
			<div className={`relative w-full overflow-hidden shadow-md rounded-lg ${containerStyle}`}>
				{/* Skeleton Screen */}
				<div className={`bg-white absolute w-full h-full z-10 ${loaded ? 'hidden' : ''}`}>
					<div className="w-full h-full animate-pulse bg-slate-300"></div>
				</div>
				{/* content */}
				<button type="button" onClick={handleClick} className="w-full h-full">
					<img ref={imgElementRef} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-110" src={props.path} alt={props.name} loading="lazy" />
				</button>
			</div>
			<ImageModal closer={setOpen} props={props} isModalOpen={open} />
		</div>
	);
}
