import type { ImageContentArray } from './types';

/**
 * Promiseの状態を監視し、サスペンスと連携するためのラッパー
 * @param {Promise<ImageContentArray>} inputPromise - データフェッチとプリロードを含むPromise
 */
export const wrapPromise = (inputPromise: Promise<ImageContentArray>) => {
	let status = 'pending';
	let result: ImageContentArray = [];
	let promise: null | Promise<void> = null;

	promise = inputPromise.then(
		r => {
			status = 'success';
			result = r;
		},
		e => {
			console.error('Promise JSON Loading Error', e);
			status = 'error';
			result = [];
		},
	);

	return {
		// データを読み取るためのメソッド
		read() {
			switch (status) {
				case 'pending': // 処理中
					throw promise;
				case 'error':
					return [];
				case 'success':
					return result;
				default:
					console.error('Unknown promise status');
					return [];
			}
		},
	};
};
