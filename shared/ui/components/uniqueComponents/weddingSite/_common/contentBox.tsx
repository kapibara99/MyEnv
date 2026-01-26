export default function ContentBox({ children, title }: { children: React.ReactNode; title: string }) {
	const Title = title !== '' ? <h2 className={'text-3xl font-bold mb-5'}>{title}</h2> : <></>;
	return (
		<section className={`mt-10 mx-4 py-10 px-4 md:px-20 bg-white shadow-md relative z-1`}>
			{Title}
			<div>{children}</div>
		</section>
	);
}
