export default class LazyLoading {
	constructor(srcAttribute = 'data-lazy-loading') {
		this.attribute = srcAttribute;
		this.initializedAttribute = 'data-lazy-loading-initialized';
		this.observer = new IntersectionObserver(this.handler.bind(this), {
			// View Port内に入る前に読み込みを開始したいので、400pxを設定
			rootMargin: '400px',
		});
		this.bindCustomEvent();
	}

	handler(entries) {
		entries.forEach(entry => {
			// View Port内に入るとintersectionRatioが0を超える
			if (entry.intersectionRatio > 0) {
				// 指定の属性から元画像のパスを取得
				const src = entry.target.getAttribute(this.attribute);
				// 属性がない・設定されていないものは何もしない
				if (src) {
					// srcを元画像パスに上書き
					entry.target.setAttribute('src', src);
					// 属性を削除（不要になるため）
					entry.target.removeAttribute(this.attribute);
					entry.target.removeAttribute(this.initializedAttribute);
				}
				// 対象から外す
				this.observer.unobserve(entry.target);
			}
		});
	}

	/**
	 * Lazy Loadingの対象を追加
	 * @param {HTMLImageElement} targetElements
	 */
	addTargets(targetElements) {
		[].forEach.call(targetElements, element => {
			const img = element;
			if (img.getAttribute(this.initializedAttribute)) {
				return;
			}
			img.setAttribute(this.initializedAttribute, 'true');
			this.observer.observe(element);
		});
	}

	/**
	 * カスタムイベント経由でLazy Loading対象を追加
	 */
	bindCustomEvent() {
		document.body.addEventListener('lazyloadingaddtarget', e => {
			if (e.detail && e.detail && e.detail.length > 0) {
				this.addTargets(e.detail);
			}
		});
	}
}
