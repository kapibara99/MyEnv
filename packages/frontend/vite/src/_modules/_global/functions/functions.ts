/**
 * 指定したkey名のカスタムイベントを送信する
 * @method send
 * @param  {string} key   カスタムイベント名
 * @param  {object} value データ
 */
export const dispatch = (key: string, value = {}) => {
	let ev;
	try {
		ev = new CustomEvent(key, { detail: value });
	} catch (e) {
		// for IE
		ev = document.createEvent('CustomEvent');
		ev.initCustomEvent(key, false, false, value);
	}
	document.dispatchEvent(ev);
};

/**
 * カスタムイベントのリスナーを登録する
 * @method listen
 * @param  {string}   key      カスタムイベント名
 * @param  {Function} callback イベントリスナーから呼ばれる関数
 */
export const listen = (key: string, callback: (e: CustomEvent) => void) => {
	document.addEventListener(key as keyof DocumentEventMap, callback as () => void);
};

/**
 * @method validateKatakana
 * @description テキストにカタカナを含むか確認する
 * @param {string} text - 置換用テキスト
 * @return {boolean}   含む場合にTrue
 */
export function validateKatakana(text: string): boolean {
	/* eslint-disable no-irregular-whitespace */
	return /^[ァ-ヶー　]+$/.test(text);
}

/**
 * @method validateNumber
 * @description テキストに数字を含むか確認する
 * @param {string} text - 置換用テキスト
 * @return {boolean}   含む場合にTrue
 */
export function validateNumber(text: string): boolean {
	return /^\d+$/.test(text);
}

/**
 * @method changeNumberZenToHan
 * @description テキストに含まれる数字を半角に変換する
 * @param {string} text - 置換用テキスト
 * @return {string}   置換後テキスト
 */
export function changeNumberZenToHan(text: string) {
	return text.replace(/[０-９]/g, s => String.fromCharCode(s.charCodeAt(0) - 0xfee0));
}

/**
 * @method handleElementDisplay
 * @description HTML要素の表示・非表示を切り替える
 * @param {HTMLElement} el - HTML要素
 * @param {boolean} flag - 表示・非表示の指定
 */

export function handleElementDisplay(el: HTMLElement, flag: boolean) {
	el.style.display = flag ? '' : 'none';
	el.style.visibility = flag ? '' : 'hidden';
}

/**
 * @method removeElementAllAttr
 * @description HTML要素初期化。データ属性なども削除する
 * @param {HTMLElement} el - HTML要素
 */
export function removeElementAllAttr(el: HTMLElement) {
	handleElementDisplay(el, false);
	el.innerHTML = '';
	el.className = '';
	if (Object.keys(el.dataset).length > 0) {
		Object.keys(el.dataset).forEach((key: string) => {
			el.removeAttribute(key);
		});
	}
}
/**
 * @description ウィンドウサイズが 768px 未満の時に true を返す
 * @returns {boolean} ウィンドウサイズが 768px 未満の場合true
 */
export function checkWindowSize(): boolean {
	return window.innerWidth < 768;
}
