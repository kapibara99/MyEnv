import type { ChangeEvent } from 'react';
import { useAtom } from 'jotai';
import { chartStyleAtom } from '../../service/chart-style-edit/chartStyle.atoms';
import { createChartStyleValue, fontFamilies, fontSizes, textAligns } from '../../service/chart-style-edit/chartStyle.default';

function SelectDropDown({
	options,
	labelName,
	selectId,
	changeHandler,
}: {
	options: typeof fontSizes | typeof fontFamilies | typeof textAligns;
	labelName: string;
	selectId: string;
	changeHandler: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}) {
	return (
		<div>
			<label className="block text-lg mb-0.5" htmlFor={selectId}>
				{labelName}
			</label>
			<select className="cursor-pointer w-full bg-white p-4 rounded-lg max-w-[400px] border-2 border-base-line shadow-md" id={selectId} onChange={e => changeHandler(e)}>
				{options.map(v => (
					<option key={v} value={v}>
						{v}
					</option>
				))}
			</select>
		</div>
	);
}
export default function ChartStyleController() {
	const [style, setStyle] = useAtom(chartStyleAtom);
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { data } = Object.assign({}, style);
		switch (e.currentTarget.id) {
			case 'fontSize':
				data.fontSize = e.currentTarget.value as (typeof fontSizes)[number];
				break;
			case 'fontFamily':
				data.fontFamily = e.currentTarget.value as (typeof fontFamilies)[number];
				break;
			case 'textAlign':
				data.textAlign = e.currentTarget.value as (typeof textAligns)[number];
				break;
			default:
				return;
		}
		setStyle({ data, classValue: createChartStyleValue(data) });
	};
	return (
		<div className="mb-10 flex flex-wrap gap-3">
			<div className="col">
				<SelectDropDown selectId="fontSize" labelName="フォントサイズを選択" options={fontSizes} changeHandler={onChangeHandler} />
			</div>
			<div className="col">
				<SelectDropDown selectId="fontFamily" labelName="フォントファミリーを選択" options={fontFamilies} changeHandler={onChangeHandler} />
			</div>
			<div className="col">
				<SelectDropDown selectId="textAlign" labelName="文字揃えを選択" options={textAligns} changeHandler={onChangeHandler} />
			</div>
		</div>
	);
}
