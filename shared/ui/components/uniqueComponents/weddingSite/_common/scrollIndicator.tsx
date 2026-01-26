export default function ScrollIndiCator() {
	return (
		<>
			<div className="unique-scroll-indicator relative w-22 h-22 m-auto rounded-full border-2 border-gray-300 text-base">
				<div className="w-full h-full rounded-full border-4 border-primary transform origin-center rotate-[-90deg]"></div>
				<span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">scroll</span>
			</div>
			<div className="relative w-6 h-6 m-auto animate-blink">
				<div className="absolute inset-0 border-r-2 border-b-2 border-primary transform -translate-y-2 rotate-45"></div>
				<div className="absolute inset-0 border-r-2 border-b-2 border-primary transform rotate-45"></div>
			</div>
		</>
	);
}
