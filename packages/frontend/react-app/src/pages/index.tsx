import ContentBox from '../components/_common/contentBox';

export default function IndexPage() {
	return (
		<>
			<ContentBox title="Title A">
				<p>hogehoge</p>
			</ContentBox>
			<ContentBox title="Title B">
				<div>
					<p className="mb-4">
						hogehogehoge
						<br />
						hogehogehoge
					</p>
					<p className="mb-4">hogehoge</p>
					<p className="text-sm">※hoghehoge</p>
				</div>
			</ContentBox>
		</>
	);
}
