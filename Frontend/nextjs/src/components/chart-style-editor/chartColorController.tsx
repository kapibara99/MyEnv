import { useAtom } from 'jotai';
import { chartBgColorAtom, chartFontColorAtom } from '../../service/chart-style-edit/chartStyle.atoms';

export default function ChartColorController() {
	const [bgColor, setBgColor] = useAtom(chartBgColorAtom);
	const [fontColor, setFontColor] = useAtom(chartFontColorAtom);
	return (
		<div className="w-full flex items-center mb-10">
			<label className="flex items-center cursor-pointer" htmlFor="bgcolor">
				背景色を設定
				<input className="cursor-pointer ml-2 w-10 h-10" id="bgcolor" onChange={e => setBgColor(e.target.value)} value={bgColor} type="color" />
			</label>
			<label className="flex items-center cursor-pointer ml-10" htmlFor="fontcolor">
				フォント色を設定
				<input className="cursor-pointer ml-2 w-10 h-10" id="fontcolor" onChange={e => setFontColor(e.target.value)} value={fontColor} type="color" />
			</label>
		</div>
	);
}
