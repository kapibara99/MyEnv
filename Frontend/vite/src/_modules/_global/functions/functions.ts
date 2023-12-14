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
export const listen = (key: string, callback: Function) => {
	document.addEventListener(key as keyof DocumentEventMap, callback as any);
};

export function validateKatakana(text: string) {
	return !text.match(/^[ァ-ヶー　]+$/);
}

export function validateNumber(text: string) {
	return !text.match(/^[0-9]+$/);
}

export function changeNumberZenToHan(text: string) {
	return text.replace(/[０-９]/g, s => String.fromCharCode(s.charCodeAt(0) - 0xfee0));
}

export function handleElementDisplay(el: HTMLElement, flag: boolean) {
	el.style.display = flag ? '' : 'none';
	el.style.visibility = flag ? '' : 'hidden';
}

export function removeElementAllAttr(el: HTMLElement) {
	handleElementDisplay(el, false);
	el.innerHTML = '';
	el.setAttribute('class', '');
	if (Object.keys(el.dataset).length > 0) {
		Object.keys(el.dataset).forEach(key => {
			delete el.dataset[key];
		});
	}
}
export function checkWindowSize() {
  if (window.innerWidth < 768) {
    return true;
  }
  return false;
}
