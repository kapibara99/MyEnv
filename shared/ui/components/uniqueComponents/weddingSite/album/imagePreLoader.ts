import type { ImageContentArray } from './types';

/**
 * JSONをフェッチし、最初のN枚の画像をプリロードする
 * @param {string} jsonUrl - JSONファイルのURL
 * @param {number} limit - プリロードする画像の枚数
 * @returns {Promise<ImageContentArray>} - 全ての画像データを含むPromise
 */
export const preloadAndFetchData = async (jsonUrl: string, limit = 10): Promise<ImageContentArray> => {
	const response = await fetch(jsonUrl);
	if (!response.ok) {
		throw new Error(`Failed to fetch Preload JSON data: ${response.statusText}`);
	}
	const imageData: ImageContentArray = await response.json();
	// 最初の 'limit' 枚の画像パスを取得
	const imagesToPreload = imageData.slice(0, limit);

	// プリロード用のPromise配列を作成
	const preloadPromises = imagesToPreload.map(item => {
		return new Promise<void>(resolve => {
			const img = new Image();
			img.src = item.path;
			img.onload = () => resolve();
			img.onerror = () => {
				console.error(`画像のプリロードに失敗しました: ${item.path}`);
				resolve();
			};
		});
	});

	// すべてのプリロードが完了するのを待つ
	await Promise.all(preloadPromises);
	return imageData;
};
