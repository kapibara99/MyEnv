export default function Base({ children }: { children: React.ReactNode }) {
	return (
		// base style
		<div className="w-full h-auto text-base-font-color overflow-hidden font-main-family text-lg break-all">
			{/* base background style */}
			<div className="bg-linear-(--base-bg-gradient)">
				{/* base contents width style */}
				<div className="w-full md:w-[768px] relative overflow-hidden m-auto min-h-screen pb-40 h-full bg-base-bg-color shadow-[0_35px_30px_0px_rgba(0,0,0,0.1)]">{children}</div>
			</div>
		</div>
	);
}
