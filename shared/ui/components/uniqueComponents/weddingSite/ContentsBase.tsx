// import Header from './_common/header';

export default function ContentsBase({ children }: { children: React.ReactNode }) {
	return (
		// base style
		<div className="w-full h-full min-h-screen relative">
			{/* base background style */}
			{/* <div className={'unique-bg-flower-parts--row-a absolute -top-10 w-full h-45'}></div> */}
			<div className={'unique-bg-flower-parts--col-a absolute top-20 -left-48 rotate-10 w-100 h-100'}></div>
			<div className={'unique-bg-flower-parts--p-a absolute top-60 -right-45 -rotate-40 w-100 h-100'}></div>
			<div className={'absolute inset-0 w-full h-full bg-base-bg-color opacity-75 z-10'}></div>
			{/* children */}
			<div className="relative z-10">
				{/* <Header /> */}
				{children}
			</div>
		</div>
	);
}
