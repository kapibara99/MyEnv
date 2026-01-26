import type { MouseEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import useScrollTrigger from '../service/useScrollTrigger';
import jsonData from './data.json';
import { ImageModal } from './modal';
import type { ImageContent } from './types';

const data = jsonData as Array<ImageContent>;
const toggleOwnerList = new Set(['ALL', 'groom', 'bride']);
const tagList = new Set([...Array.from(toggleOwnerList), ...data.map(obj => [...obj.tags]).flatMap(tagArray => tagArray)]);

function ImageContentElement(props: ImageContent) {
	const [open, setOpen] = useState(false);
	const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const toOpen = !open;
		if (toOpen) {
			document.body.classList.add('show-modal');
		} else {
			document.body.classList.remove('show-modal');
		}
		setOpen(toOpen);
	};
	return (
		<div>
			<div className="w-full text-center">
				<button type="button" onClick={e => handleClick(e)}>
					<img src={props.path} alt={props.name} loading="lazy" />
				</button>
			</div>
			<ImageModal closer={setOpen} props={props} isOpen={open} />
		</div>
	);
}
export default function ImageAlbum() {
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
}
