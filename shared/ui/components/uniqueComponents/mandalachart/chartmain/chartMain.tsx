import { useAtom } from 'jotai';
import { defaultWidthSize } from '../chartStyle.default';
import { chartCellSizeAtom } from '../atoms';
import type { MandalaCellProps } from '../chart';
import { DEFAULT_CHART_DATA, CHART_MAIN_ID, STORAGE_KEY } from '../chart.functions';
import useLocalStorage from '../usestorage/useStorage';
import MandalaCell from '../chartcell/chartcell';
import ChartStyleDefault from '../chartStyleDefault/chartStyleDefault';

export default function ChartMain() {
	const [cellSize] = useAtom(chartCellSizeAtom);
	const { storedValue } = useLocalStorage(STORAGE_KEY, DEFAULT_CHART_DATA());
	console.log('storedValue', storedValue);

	return (
		<ChartStyleDefault>
			<div className={`${defaultWidthSize} p-4 bg-white overflow-x-auto shadow-md`}>
				<div id={CHART_MAIN_ID} className="grid grid-cols-9 min-w-[1000px]" style={{ width: Number.isNaN(cellSize) ? cellSize : Number(cellSize) * 9 + 'px' }}>
					{(storedValue as MandalaCellProps[]).map(props => (
						<MandalaCell key={`${props.cellType}-${props.zahyou[0]}-${props.zahyou[1]}`} {...props} />
					))}
				</div>
			</div>
		</ChartStyleDefault>
	);
}
