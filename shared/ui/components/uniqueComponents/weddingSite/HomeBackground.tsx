import { useInView } from 'react-cool-inview';
export default function HomeBackground({ children }: { children: React.ReactNode }) {
	const { observe, inView } = useInView({
		unobserveOnEnter: false,
		rootMargin: '0px 0px',
	});
	const animationClass = import.meta.env.PROD ? 'transition-all duration-3000' : '';
	const uniqueBgShowClass = `unique-home-bg ${inView ? '-show' : ''}`;
	return (
		// base style
		<div className="w-full h-full relative overflow-hidden" ref={observe}>
			{/* base background style */}
			<div className={`unique-bg-flower-parts--row-a absolute -top-10 w-full h-45 delay-0 ${animationClass} ${uniqueBgShowClass}`}></div>
			<div className={`unique-bg-flower-parts--col-a absolute top-40 -left-48 rotate-10 w-100 h-100 delay-500 ${animationClass}  ${uniqueBgShowClass}`}></div>
			<div className={`unique-bg-flower-parts--p-a absolute top-60 -right-45 -rotate-40 w-100 h-100 delay-750 ${animationClass}  ${uniqueBgShowClass}`}></div>
			{/* children */}
			<div className={`relative z-10 delay-1000 ${animationClass} ${uniqueBgShowClass}`}>{children}</div>
		</div>
	);
}
