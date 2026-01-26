import type { Dispatch, MouseEvent } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { ImageContent } from './types';

import 'swiper/css';
import 'swiper/css/navigation';

export function ImageModal({ isOpen, props, closer }: { isOpen: boolean; props: ImageContent; closer: Dispatch<React.SetStateAction<boolean>> }) {
	const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		closer(false);
		document.body.classList.remove('show-modal');
	};
	const openClass = isOpen ? '' : 'hidden';
	return (
		<div className={openClass}>
			<button type="button" onClick={e => handleClick(e)} className="fixed w-full h-full bg-base-font-color opacity-30 inset-0"></button>
			<div className="fixed w-full md:w-[80%] md:max-w-[900px] p-6 h-[70%] md:h-[80%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-white overflow-y-scroll">
				<div className="text-center">
					{props.pathList ? (
						<div className="unique-modal-swiper min-w-1/2 m-auto">
							<Swiper className="w-full h-full" navigation={true} modules={[Navigation]} spaceBetween={50} slidesPerView={1} loop={true}>
								{props.pathList.map(image => (
									<SwiperSlide key={image} className="inset-0 text-center">
										<img src={image} alt="" />
									</SwiperSlide>
								))}
							</Swiper>
						</div>
					) : (
						<img className="min-w-1/2 inline-block" src={props.path} alt={props.name} />
					)}
				</div>
				<div className="my-8">
					<p className="text-2xl font-bold">{props.name}</p>
					<p className="font-bold text-right">{props.imageDate}</p>
					<p className="mt-4">{props.description}</p>
				</div>
				<div className="flex justify-center">
					<button type="button" onClick={e => handleClick(e)} className="relative flex gap-1.5 px-8 py-2 bg-attention rounded-xl hover:opacity-60 transition font-bold shadow-md bg-white">
						閉じる
					</button>
				</div>
			</div>
		</div>
	);
}
