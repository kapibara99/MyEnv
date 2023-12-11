export function Modal(root: HTMLElement) {
	// props
	const openerSelector = root.dataset.opener ?? '.modal-opener';
	const closerSelector = root.dataset.closer ?? '.modal-closer';
	// const openedClass = '-opened';
	// const openingClass = '-opening';
	// const closingClass = '-closing';
	// const scrollPreventedClass = '-modal--scrollPrevented';
	// const isOpenedFlag = root.classList.contains(openedClass);
	// const currentY = 0;

	// initialize
	initializeEvents();

	// methods
	function initializeEvents() {
		const openers = [].slice.call(document.querySelectorAll(openerSelector));
		openers.forEach((el: HTMLElement) => {
			el.addEventListener('click', e => {
				e.preventDefault();
				openModal();
			});
		});

		const closers = [].slice.call(root.querySelectorAll(closerSelector));
		closers.forEach((el: HTMLElement) => {
			el.addEventListener('click', e => {
				e.preventDefault();
				closeModal();
			});
		});
	}

	function openModal() {
		console.log('open');
		// const transitionEndHandler = () => {
		// 	root.classList.remove(openingClass);
		// 	root.classList.add(openedClass);

		// 	// モーダル外のスクロールを止める
		// 	setPreventBodyScrolling();
		// 	isOpenedFlag = true;
		// };
		// CSSでTransitionを定義しておき、transitionendイベントでJavaScriptから制御する
		// this.container.addEventListener(this.transitionEndEvent, transitionEndHandler);
		// this.root.classList.add(this.openingClassName);
	}

	function closeModal() {
		console.log('close');
	}

	// bodyのスクロールを止める
	// function setPreventBodyScrolling() {
	// 	currentY = window.pageYOffset;
	// 	// bodyをクラス名でposition:fixed;に設定し、topで元の位置に異動させ、見かけ上同じ位置にする
	// 	document.body.style.top = `-${currentY}px`;
	// 	document.body.classList.add(scrollPreventedClass);
	// }

	// // bodyのスクロールを解除
	// function unsetPreventBodyScrolling() {
	// 	document.body.style.top = '';
	// 	document.body.classList.remove(scrollPreventedClass);
	// 	window.scrollTo(0, currentY);
	// }
}

// initialize
window.addEventListener('DOMContentLoaded', () => {
	const modals = [].slice.call(document.querySelectorAll('.a-c-o-modal'));
	modals.forEach((el: HTMLElement) => { Modal(el); });
});
