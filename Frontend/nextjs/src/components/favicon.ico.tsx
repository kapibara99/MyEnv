export default function FaviconSample() {
	const box = ' w-10 h-10 border border-t-0 border-l-0';
	return (
		<div className="grid grid-cols-3 w-30">
			<div className={'bg-red-400' + box}></div>
			<div className={'bg-yellow-200' + box}></div>
			<div className={'bg-green-300' + box}></div>

			<div className={'bg-purple-400' + box}></div>
			<div className={'bg-main' + box}></div>
			<div className={'bg-pink-600' + box}></div>

			<div className={'bg-orange-700' + box}></div>
			<div className={'bg-teal-800' + box}></div>
			<div className={'bg-indigo-900' + box}></div>
		</div>
	);
}
