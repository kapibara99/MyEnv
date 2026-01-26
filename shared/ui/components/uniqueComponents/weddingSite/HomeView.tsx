import HomeBackground from './HomeBackground';
// import HomeCarousel from './HomeCarouselView';
import ContentBox from './_common/contentBox';
import ScrollIndiCator from './_common/scrollIndicator';
import { getCountdownInfo } from './service/countdown';

export default function Home() {
	const countdown = getCountdownInfo();
	return (
		<HomeBackground>
			{/* countdown  and top message */}
			<div className="pt-30 md:pt-50 mb-10 text-center">
				{/* first message */}
				<p className="unique-font-arrangement-banzai">
					{countdown.isNowCelebration ? '開催中!' : countdown.afterCelebration ? 'ご参列ありがとうございました!' : '開催まであと' + countdown.dateDiff + '日'}
				</p>
				{/* type A (欧文中心) */}
				<h1 className="mt-1 text-4xl md:text-5xl font-primary-europa">
					<span className="text-2xl md:text-3xl">2099/11/55.51</span>
					<br />
					Wedding Ceremony
				</h1>
				<p className="text-3xl md:text-4xl font-primary-europa">Name × Name</p>
			</div>
			{/* carousel image area */}
			{/* <HomeCarousel /> */}
			<div className="w-50 m-auto rounded-xl overflow-hidden">
				<img src="/resource/all-main.png" alt="" />
			</div>
			{/* scroll tip */}
			<div className="mx-auto my-5">
				<ScrollIndiCator />
			</div>
			{/* sub home contents */}
			<ContentBox title="ご挨拶">
				<p>皆様、お忙しいところ私たちのためにお集まりいただき、本当にありがとうございます。</p>
				<p>今日という日を迎えられたのは、いつも私たちを温かく見守ってくれた、ここにいる皆様のおかげです。</p>
				<p>これからは二人で力を合わせ、笑顔の絶えない家庭を築いていきたいと思います。</p>
				<p>二日間という短い時間ですが、皆様と楽しい時間を過ごせたら幸いです。</p>
				<p className="mt-2 text-right">製作者より</p>
			</ContentBox>
			<ContentBox title="注意事項">
				<p>
					検索エンジン等には出てこないよう設定されていますが、URLを知っている人間は誰でもアクセスすることが可能なサイトとなっています。そのため、必要以上にサイトについてSNSやネット上へのシェアはお控えいただくようお願いいたします。
				</p>
			</ContentBox>
			<div className="invisible h-8"></div>
		</HomeBackground>
	);
}
