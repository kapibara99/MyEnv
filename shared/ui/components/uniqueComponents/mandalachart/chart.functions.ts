import type { CellType, CellZahyou, MandalaCellProps } from './chart';

/**
 * @module addChartCellSynchronizeEvent
 * sub titleの時、セル同期用のイベントを登録する
 * @param {Function} callback - イベント実行時のState更新用関数が入る想定
 */
export const addChartCellSynchronizeEvent = (cellType: CellType, zahyou: CellZahyou, callback: (event: string) => void): void => {
	if (cellType !== 'subTitle') return;
	const handleInputChange = (event: CustomEvent<string>) => callback(event.detail);
	const eventName = `inputChange-${zahyou.join(',')}`;
	document.removeEventListener(eventName, handleInputChange as EventListenerOrEventListenerObject);
	document.addEventListener(eventName, handleInputChange as EventListenerOrEventListenerObject);
};

export const CHART_MAIN_ID = 'chart-main';
export const STORAGE_KEY = 'chart-storage-data';

export const CHART_COLORS = [
	'border-[#fd6467]',
	'border-[#fdf085]',
	'border-[#7bf1a7]',
	'border-[#c27aff]',
	'border-[#2a90ff]',
	'border-[#e60a76]',
	'border-[#ca3500]',
	'border-[#07605a]',
	'border-[#312c85]',
];

/**
 * @module getCategoryColorFromZahyou
 * 座標配列を受け取り、カテゴリごとの、 border-color を返す
 */
export function getCategoryColorFromZahyou(zahyou: CellZahyou) {
	function checker(z: number, val: number) {
		return z == val;
	}
	if ((checker(zahyou[0], 1) && zahyou[1] === 1) || (checker(zahyou[0], 3) && zahyou[1] === 3)) {
		return CHART_COLORS[0];
	} else if ((checker(zahyou[0], 1) && zahyou[1] === 4) || (checker(zahyou[0], 3) && zahyou[1] === 4)) {
		return CHART_COLORS[1];
	} else if ((checker(zahyou[0], 1) && zahyou[1] === 7) || (checker(zahyou[0], 3) && zahyou[1] === 5)) {
		return CHART_COLORS[2];
	} else if ((checker(zahyou[0], 4) && zahyou[1] === 1) || (checker(zahyou[0], 4) && zahyou[1] === 3)) {
		return CHART_COLORS[3];
	} else if ((checker(zahyou[0], 4) && zahyou[1] === 5) || (checker(zahyou[0], 4) && zahyou[1] === 7)) {
		return CHART_COLORS[5];
	} else if ((checker(zahyou[0], 5) && zahyou[1] === 3) || (checker(zahyou[0], 7) && zahyou[1] === 1)) {
		return CHART_COLORS[6];
	} else if ((checker(zahyou[0], 5) && zahyou[1] === 4) || (checker(zahyou[0], 7) && zahyou[1] === 4)) {
		return CHART_COLORS[7];
	} else if ((checker(zahyou[0], 5) && zahyou[1] === 5) || (checker(zahyou[0], 7) && zahyou[1] === 7)) {
		return CHART_COLORS[8];
	}
	return CHART_COLORS[4];
}

/**
 * @module DEFAULT_CHART_DATA
 * チャートの初期値を設定データを返す
 */
export const DEFAULT_CHART_DATA = () => {
	const MandalaCellDefault: MandalaCellProps = {
		cellType: 'item',
		isFocused: false,
		value: '',
		zahyou: [-1, -1],
	};
	const cellTypeZhyou = [
		[...new Array(9).fill(null)],
		[null, 'No.1', null, null, 'No.2', null, null, 'No.3', null],
		[...new Array(9).fill(null)],
		[null, null, null, 'No.1', 'No.2', 'No.3', null, null, null],
		[null, 'No.4', null, 'No.4', 'center', 'No.5', null, 'No.5', null],
		[null, null, null, 'No.6', 'No.7', 'No.8', null, null, null],
		[...new Array(9).fill(null)],
		[null, 'No.6', null, null, 'No.7', null, null, 'No.8', null],
		[...new Array(9).fill(null)],
	];
	const MandalaCellList: MandalaCellProps[][] = Array.from({ length: 9 }, () => {
		return Array.from({ length: 9 }, () => MandalaCellDefault);
	});

	const result: MandalaCellProps[] = [];
	for (let i = 0; i < MandalaCellList.length; i++) {
		for (let j = 0; j < MandalaCellList[i].length; j++) {
			const obj = Object.assign({}, MandalaCellList[i][j]);
			obj.zahyou = [i, j];
			const zahyouValue = cellTypeZhyou[i][j];
			if (zahyouValue) {
				obj.value = zahyouValue;
				obj.cellType = zahyouValue.includes('No.') ? 'subTitle' : 'title';
			} else {
				obj.value = '';
			}
			result.push(obj);
		}
	}

	return result;
};

/**
 * @module getSameValueZahyou
 * サブカテゴリのセル同期用
 * inputZahyou から、同期されるセルの座標を返す
 */
export const getSameValueZahyou = (inputZahyou: CellZahyou): CellZahyou => {
	const result: CellZahyou = [0, 0];
	function setXzahyou() {
		if (inputZahyou[1] == 1) {
			result[1] = 3;
		} else if (inputZahyou[1] == 3) {
			result[1] = 1;
		} else if (inputZahyou[1] == 4) {
			result[1] = 4;
		} else if (inputZahyou[1] == 5) {
			result[1] = 7;
		} else if (inputZahyou[1] == 7) {
			result[1] = 5;
		}
	}
	switch (inputZahyou[0]) {
		case 1:
			result[0] = 3;
			setXzahyou();
			break;
		case 7:
			result[0] = 5;
			setXzahyou();
			break;
		case 3:
			result[0] = 1;
			setXzahyou();
			break;
		case 4:
			result[0] = 4;
			setXzahyou();
			break;
		case 5:
			result[0] = 7;
			setXzahyou();
			break;
		case 0:
		case 2:
		case 6:
		case 8:
			break;
	}
	// if (result[0] === 0 || result[1] === 0) {
	//   console.log("error", result, inputZahyou);
	// }
	return result;
};
