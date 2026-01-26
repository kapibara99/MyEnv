const leftSidePeople = ['佐藤花子', '佐藤花二', '佐藤花三', '佐藤花四', '佐藤花五', '鈴木ああ', '高橋いい'];
const rightSidePeople = ['鈴木ああ', '鈴木いい', '鈴木うう', '鈴木ええ', '鈴木おお'];

export default function Table() {
	return (
		<div className="overflow-x-auto">
			<div className="min-w-100 w-full m-auto">
				<p className="text-xl font-bold text-center">奥（窓側）</p>
				<div className="flex justify-center my-4">
					<ul className="flex flex-col justify-between">
						{leftSidePeople.map((people, index) => (
							<li key={people + String(index)}>{people}</li>
						))}
					</ul>
					<div className="mx-4 border w-25 h-75"></div>
					<ul className="flex flex-col justify-between">
						{rightSidePeople.map((people, index) => (
							<li key={people + String(index)}>{people}</li>
						))}
					</ul>
				</div>
				<p className="text-xl font-bold text-center">手前（入り口側）</p>
			</div>
		</div>
	);
}
