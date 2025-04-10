import type { CellType, CellZahyou } from './chart';

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
