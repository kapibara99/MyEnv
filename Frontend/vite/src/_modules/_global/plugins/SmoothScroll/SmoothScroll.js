import { EasingFunctions } from './EasingFunctions';

export default class SmoothScroll {
	constructor() {
		this.duration = 400;
		this.easing = 'easeOutCubic';
		this.offset = 0;
		this.delay = 0;
	}

	addTargets(links) {
		[].forEach.call(links, link => {
			if (!SmoothScroll.isTarget(link)) {
				return;
			}
			const href = link.getAttribute('href') || link.dataset.href;
			if (!SmoothScroll.isValidSelector(href)) {
				return;
			}
			this.setClickEvent(link, href);
		});
	}

	setClickEvent(element, targetSelector) {
		const link = element;
		const duration = +link.dataset.duration || this.duration;
		const offset = link.dataset.deviceAgent && SmoothScroll.detectUserAgent() !== link.dataset.deviceAgent ? 0 : +link.dataset.offset || this.offset;
		const delay = +link.dataset.delay || this.delay;
		const easing = link.dataset.easing || this.easing;
		const easingFunction = SmoothScroll.getEasingFunction(easing);

		// 非a要素でもタップ時にhightlightを付けるためにcursorを変える
		link.style.cursor = 'pointer';
		const clickHandler = e => {
			e.preventDefault();
			// クリック時に要素を取得する、なければイベントリスナーを外す
			const target = document.querySelector(targetSelector);
			if (!target) {
				link.removeEventListener('click', clickHandler);
				return;
			}
			const rect = target.getBoundingClientRect();
			// 自分または祖先要素がdisplay:none;の場合、以下4つは0になる
			// その場合、topも0になるためページトップへジャンプしないようにイベントリスナーを外す
			if (rect.x === 0 && rect.y === 0 && rect.width === 0 && rect.height === 0) {
				return;
			}
			const { pageYOffset } = window;
			// 要素の座標を取得
			const destinationY = rect.top - offset;
			if (delay > 0) {
				setTimeout(() => {
					SmoothScroll.doScroll(pageYOffset, destinationY, easingFunction, duration);
				}, delay);
			} else {
				SmoothScroll.doScroll(pageYOffset, destinationY, easingFunction, duration);
			}
		};
		link.addEventListener('click', clickHandler);
	}

	static detectUserAgent() {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'sp' : 'pc';
	}

	/**
	 * 指定した座標まで指定時間でeasingをかけてスクロールする
	 * @param {Number} currentY - 現在のY座標
	 * @param {Number} destinationY - 目的地のY座標
	 * @param {Function} easingFunction - イージングのfunction
	 * @param {Number} duration - 移動時間
	 * @returns - void
	 */
	static doScroll(currentY, destinationY, easingFunction, duration) {
		if (duration === 0) {
			window.scrollTo(0, destinationY + currentY);
			return;
		}
		let start = 0;
		let rafRequest;
		const step = timestamp => {
			if (start === 0) {
				start = timestamp;
			}
			const progress = timestamp - start;
			const percent = progress / duration;
			if (progress < duration) {
				window.scrollTo(0, parseInt(destinationY * easingFunction(percent), 10) + currentY);
				rafRequest = window.requestAnimationFrame(step);
			} else {
				window.scrollTo(0, destinationY + currentY);
				window.cancelAnimationFrame(rafRequest);
			}
		};
		rafRequest = window.requestAnimationFrame(step);
	}

	/**
	 * 設定されたeasingの名前からライブラリの実際のfunctionを返す。
	 * 直接指定した名前のfunctionを返すと、存在しない場合にエラーになるのを避けるためswitchで分岐する
	 * @param {String} functionName - easing名
	 * @param {Object} easings - easingのfunctionがまとめられたobject
	 * @returns {Function} - easingのfunction
	 */
	static getEasingFunction(functionName, easings = EasingFunctions) {
		const lowerCase = functionName.toLowerCase();
		switch (lowerCase) {
			case 'linear':
				return easings.linear;
			case 'easeinquad':
				return easings.easeInQuad;
			case 'easeoutquad':
				return easings.easeOutQuad;
			case 'easeinoutquad':
				return easings.easeInOutQuad;
			case 'easeincubic':
				return easings.easeInCubic;
			case 'easeoutcubic':
				return easings.easeOutCubic;
			case 'easeinoutcubic':
				return easings.easeInOutCubic;
			case 'easeinquart':
				return easings.easeInQuart;
			case 'easeoutquart':
				return easings.easeOutQuart;
			case 'easeinoutquart':
				return easings.easeInOutQuart;
			case 'easeinquint':
				return easings.easeInQuint;
			case 'easeoutquint':
				return easings.easeOutQuint;
			case 'easeinoutquint':
				return easings.easeInOutQuint;
			default:
				return easings.easeOutCubic;
		}
	}

	/**
	 * 正しい文法のCSS Selectorかどうかを、querySelectorのエラー有無で判別する
	 * @param {String} selector - CSS Selector
	 * @returns {Boolean} - 正しいセレクターかどうか
	 */
	static isValidSelector(selector) {
		try {
			document.querySelector(selector);
		} catch (error) {
			return false;
		}
		return true;
	}

	/**
	 * Smooth Scrollできる要素・設定があるかを確認する
	 * @param {Element} element - 対象の要素
	 * @returns {Boolean} - 対象かどうか
	 */
	static isTarget(element) {
		// a要素の場合はhref属性の有無とアンカーリンクかどうかをチェック
		if (element.nodeName.toLowerCase() === 'a' && element.href && /^#./.test(element.getAttribute('href'))) {
			return true;
		}
		// それ以外の要素の場合はdata-href属性の有無をチェック
		if (element.dataset.href) {
			return true;
		}
		return false;
	}
}
