import type { MouseEvent } from 'react';
import { Suspense, useEffect, useRef, useState } from 'react';
import useScrollTrigger from '../service/useScrollTrigger';
import DisplayFullSizeLoading from '../_common/loading';
import { ImageContentElement } from './imageContent';
import { preloadAndFetchData } from './imagePreLoader';
import { wrapPromise } from './imageSuspenseWrapper';

const toggleOwnerList = new Set(['ALL', 'groom', 'bride']);

const imageResource = wrapPromise(preloadAndFetchData('/components/uniqueComponents/weddingSite/album/data.json'));

const ImageAlbumContents = () => {
	const data = imageResource.read();
	const tagList = new Set([...toggleOwnerList, ...data.flatMap(obj => obj.tags)]);
	const [imageData, setImageData] = useState(data);
	const [currentActiveTag, setCurrentActiveTag] = useState('ALL');
	const handleTagClick = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const tagName = e.currentTarget.dataset?.tagName;
		if (!tagName) return;
		window.scrollTo(0, 0);
		setCurrentActiveTag(tagName);
		if (tagName == 'ALL') {
			setImageData(data);
		} else {
			let newData = [];
			if (['groom', 'bride'].includes(tagName)) {
				newData = data.filter(obj => obj.owner.includes(tagName));
			} else {
				newData = data.filter(obj => obj.tags.includes(tagName));
			}
			setImageData(newData);
		}
	};
	const { isScrolled } = useScrollTrigger();
	const [filterLeftPosition, setFilterLeftPosition] = useState<Omit<DOMRect, 'toJSON'> | null>(null);
	const filterRef = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		const handleResize = () => {
			window.scrollTo(0, 0);
			setTimeout(() => {
				if (filterRef.current) {
					setFilterLeftPosition(filterRef.current.getBoundingClientRect());
				}
			}, 200);
		};
		handleResize(); // Set initial position
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<div className="p-4">
			{/* sort filter */}
			<div style={{ minHeight: filterLeftPosition ? `${filterLeftPosition.height}px` : '10px' }}>
				<div className={`md:max-w-[768px] mb-4 ${isScrolled ? `fixed top-5 pr-4` : ''}`} style={{ left: filterLeftPosition ? `${filterLeftPosition.left}px` : 'none' }} ref={filterRef}>
					{Array.from(tagList).map(tag => (
						<button
							data-tag-name={tag}
							key={tag}
							type="button"
							className={'py-1 px-3 bg-attention rounded-lg hover:opacity-75 transition shadow-md mr-2 mb-2' + ' ' + (currentActiveTag == tag ? 'bg-primary-2 pointer-events-none' : 'bg-white')}
							onClick={e => handleTagClick(e)}>
							{tag === 'groom' ? '新郎' : tag === 'bride' ? '新婦' : tag}
						</button>
					))}
				</div>
			</div>

			{/* image album list */}
			{imageData.length ? (
				(() => {
					return (
						<div className="grid grid-cols-2 gap-4">
							{imageData.map(props => (
								<ImageContentElement key={props.path} {...props} />
							))}
						</div>
					);
				})()
			) : (
				<p className="font-bold">該当する画像がありません。</p>
			)}
		</div>
	);
};

export default function ImageAlbum() {
	return (
		<Suspense fallback={<DisplayFullSizeLoading />}>
			<ImageAlbumContents />
		</Suspense>
	);
}
