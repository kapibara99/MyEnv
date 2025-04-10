export default function BackendCircleAnimation({ children }: { children: React.ReactNode }) {
	const baseDivStyle = 'absolute size-full rounded-[50%] border-[3px] animate-back-circle opacity-0';
	return (
		<>
			<div className={`absolute overflow-hidden z-0 size-[100vw]`}>
				<div className={`${baseDivStyle} border-main-light`}></div>
				<div className={`${baseDivStyle} border-main animation-delay-3000`}></div>
				<div className={`${baseDivStyle} border-main-strong animation-delay-6000`}></div>
			</div>
			<div className="relative z-1 mt-20">{children}</div>
		</>
	);
}
