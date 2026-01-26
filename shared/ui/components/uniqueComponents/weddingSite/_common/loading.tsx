export default function DisplayFullSizeLoading() {
	return (
		<div className="bg-gray-400/50 w-full h-full fixed z-10 inset-0 flex justify-center items-center">
			<div role="status" aria-label="読み込み中">
				<div className="animate-spin h-10 w-10 border-4 border-primary-3 rounded-full border-t-transparent"></div>
			</div>
		</div>
	);
}
