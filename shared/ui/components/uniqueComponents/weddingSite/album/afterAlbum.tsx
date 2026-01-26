import type { MouseEvent } from 'react';
import { Suspense, useEffect, useRef, useState } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import { useTour } from '@reactour/tour';
import Footer from '../_common/footer';
import Icon from '../_common/icon';
import DisplayFullSizeLoading from '../_common/loading';
import { CheckTourShown } from '../tour/tour.util';
import { convertTagName } from './album.util';
import { ImageContentElement } from './imageContent';
import { preloadAndFetchData } from './imagePreLoader';
import { wrapPromise } from './imageSuspenseWrapper';
import type { ImageContent } from './types';

const toggleOwnerList = new Set(['ALL', 'groom', 'bride']);

const imageResource = wrapPromise(preloadAndFetchData('/components/uniqueComponents/weddingSite/album/data.json'));

const ImageAlbumContents = () => {
	const contentRef = useRef<HTMLDivElement>(null);
	const { setIsOpen: setIsTourOpen } = useTour();
	// image data
	const data = imageResource.read();
	const tagList = new Set([...toggleOwnerList, ...data.flatMap((obj: ImageContent) => obj.tags)]);
	// param
	const [searchParams, setSearchParams] = useSearchParams();

	const getInitialTag = () => {
		const tagFromUrl = searchParams.get('tag');
		if (tagFromUrl && tagList.has(tagFromUrl)) {
			return tagFromUrl;
		}
		return 'ALL';
	};
	// tag name list and event
	const [currentActiveTag, setCurrentActiveTag] = useState(getInitialTag);
	const filterData = (tag: string) => {
		if (tag === 'ALL') {
			return data;
		}
		if (['groom', 'bride'].includes(tag)) {
			return data.filter(obj => obj.owner.includes(tag));
		}
		return data.filter(obj => obj.tags.includes(tag));
	};
	// image data
	const [imageData, setImageData] = useState(() => filterData(currentActiveTag));
	// filter event
	const handleTagClick = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const tagName = e.currentTarget.dataset?.tagName;
		if (!tagName) return;
		if (contentRef.current) contentRef.current.scrollTop = 0;
		setCurrentActiveTag(tagName);
		setImageData(filterData(tagName));
		setSearchParams(tagName === 'ALL' ? {} : { tag: tagName });
	};
	// scroll to active tab
	const tabContainerRef = useRef<HTMLDivElement>(null);
	// add first load event
	useEffect(() => {
		if (!CheckTourShown()) setIsTourOpen(true);
		document.body.classList.add('height-fixed');
		return () => {
			setIsTourOpen(false);
			document.body.classList.remove('height-fixed');
		};
	}, [setIsTourOpen]);
	useEffect(() => {
		if (tabContainerRef.current) {
			const activeTabElement = tabContainerRef.current.querySelector<HTMLButtonElement>(`[data-tag-name="${currentActiveTag}"]`);
			if (activeTabElement) {
				activeTabElement.scrollIntoView({
					behavior: 'smooth',
					inline: 'end',
					block: 'nearest',
				});
			}
		}
	}, [currentActiveTag]);
	return (
		<div className="pt-4 px-2 h-[100dvh] flex flex-col">
			<header className="px-4 md:px-10 flex-shrink-0">
				{/* home icon */}
				<div className="flex justify-between items-center">
					<NavLink to="/" className="size-8">
						<Icon ownClassName="size-auto" iconName="home" />
					</NavLink>
				</div>
				{/* tab filter */}
				<div ref={tabContainerRef} className="flex overflow-scroll mb-3">
					{Array.from(tagList).map(tag => (
						<button
							data-tag-name={tag}
							key={tag}
							type="button"
							className={`block text-center min-w-50 py-2 px-3 mr-2 bg-attention border-b-4 ${currentActiveTag === tag ? 'border-primary-2 pointer-events-none' : 'border-transparent'}`}
							onClick={e => handleTagClick(e)}>
							{convertTagName(tag)}
						</button>
					))}
				</div>
			</header>
			{/* content */}
			<div ref={contentRef} className="overflow-y-scroll pb-10">
				<h2 className="font-bold text-3xl mb-2 px-2">{convertTagName(currentActiveTag)}</h2>
				{/* image album list */}
				{imageData.length ? (
					<div className="grid grid-cols-3 gap-1 grid-flow-row-dense">
						{imageData.map(props => (
							<ImageContentElement key={props.path} {...props} />
						))}
					</div>
				) : (
					<p className="font-bold">該当する画像がありません。</p>
				)}
			</div>
			<Footer />
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
