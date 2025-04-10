import type { ChangeEvent, FocusEvent, MouseEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import { chartBgColorAtom, chartFontColorAtom } from '../../service/chart-style-edit/chartStyle.atoms';
import type { MandalaCellProps } from '../../service/mandara-chart/chart';
import { addChartCellSynchronizeEvent } from '../../service/mandara-chart/chart.method';
import { STORAGE_KEY, getCategoryColorFromZahyou, getSameValueZahyou } from '../../service/mandara-chart/chart.variables';
import useLocalStorage from '../../service/mandara-chart/useStorage';

export default function MandalaCell({ cellType, value, isFocused, zahyou }: MandalaCellProps) {
	const inputRef = useRef<HTMLTextAreaElement>(null);
	const { localSetter } = useLocalStorage(STORAGE_KEY);

	const [bgColor] = useAtom(chartBgColorAtom);
	const [fontColor] = useAtom(chartFontColorAtom);

	const [cellValue, setCellValue] = useState(value);
	const [cellFocused, setCellFocused] = useState(isFocused);

	useEffect(() => {
		if (inputRef.current) addChartCellSynchronizeEvent(cellType, zahyou, setCellValue);
	}, [cellType, zahyou]);

	const handleFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
		setCellFocused(e.currentTarget == document.activeElement);
		const valueEnd = e.currentTarget.value.length;
		e.currentTarget.setSelectionRange(valueEnd, valueEnd);
	};

	const handleClick = (e: MouseEvent<HTMLElement>) => {
		e.preventDefault();
		if (inputRef.current) inputRef.current.focus();
	};

	const otherCellZahyou = cellType == 'subTitle' ? getSameValueZahyou(zahyou) : zahyou;
	const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setCellValue(e.target.value);
		// Update Local Storage
		localSetter(e.target.value, zahyou);
		// 別のセルを更新
		if (cellType == 'subTitle') {
			const event = new CustomEvent(`inputChange-${otherCellZahyou.join(',')}`, {
				detail: e.target.value,
			});
			document.dispatchEvent(event);
			localSetter(e.target.value, otherCellZahyou);
		}
	};

	return (
		<div
			className={`relative flex items-center p-2 break-all min-h-15 ${cellType == 'item' ? '' : 'font-bold'}`}
			data-zahyou={zahyou.join(',')}
			style={{ backgroundColor: bgColor, color: fontColor }}
			id={cellType == 'title' ? 'center-cell' : ''}>
			{/* ツールチップ */}
			<div
				className={
					'w-64 p-4 bg-white border border-gray-200 rounded-md absolute' +
					' ' +
					(zahyou[1] > 4 ? 'right-0' : 'left-0') +
					' ' +
					(zahyou[0] > 2 ? 'bottom-4/5' : 'top-full') +
					' ' +
					'transition-opacity duration-1000 -z-10 focus-within:z-100 opacity-0 focus-within:opacity-100 pointer-events-none focus-within:pointer-events-auto'
				}>
				<textarea
					ref={inputRef}
					value={cellValue}
					onFocus={e => handleFocus(e)}
					onBlur={e => handleFocus(e)}
					onInput={handleInput}
					className="w-full h-20 border border-gray-300 p-2 border-none break-all"
				/>
			</div>

			{/* クリック/ホバー用 */}
			<button
				className={`absolute top-0 right-0 w-full h-full block cursor-pointer hover:opacity-10 hover:bg-main-light ${
					cellFocused
						? 'border-attention border-4 -border-offset-4 z-4' // focused style
						: cellType == 'title'
							? 'border-main border-4 -border-offset-4 z-3' // main title cell
							: cellType == 'subTitle'
								? `${getCategoryColorFromZahyou(zahyou)} border-4 -border-offset-4 z-2` // sub title cell
								: 'border-base-line border' // item cell
				}`}
				tabIndex={-1}
				type="button"
				onClick={e => handleClick(e)}
			/>
			{/* 表示するvalue */}
			<span className="block w-full whitespace-pre-line">{cellValue}</span>
		</div>
	);
}
