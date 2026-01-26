import { EffectFade, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';

const images = ['https://placehold.jp/100x50.png', 'https://placehold.jp/100x500.png', 'https://placehold.jp/200x50.png'];

export default function HomeCarousel() {
	return (
		<div className="w-50 h-50 m-auto my-10">
			<Swiper
				className="w-full h-full relative"
				spaceBetween={50}
				slidesPerView={1}
				effect={'fade'}
				speed={2000}
				loop={true}
				modules={[EffectFade, Autoplay]}
				fadeEffect={{ crossFade: true }}
				autoplay={{
					delay: 0,
					disableOnInteraction: false,
				}}
				allowTouchMove={false}>
				{images.map(image => (
					<SwiperSlide key={image} className="text-center m-auto">
						<img src={image} alt="" className="absolute inset-0 block m-auto" />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
