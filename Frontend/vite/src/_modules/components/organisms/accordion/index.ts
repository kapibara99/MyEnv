const ACC_OPENED_CLASS = '-opened';

const animationTiming: KeyframeAnimationOptions = {
	duration: 200,
	easing: 'ease-out',
};

const closingAnimKeyframes = (content: HTMLElement): Keyframe[] => [
	{
		height: content.offsetHeight + 'px', // height: "auto"だとうまく計算されないため要素の高さを指定する
	},
	{
		height: 0,
	},
];

/**
 * アコーディオンを開くときのキーフレーム
 */
const openingAnimKeyframes = (content: HTMLElement) => [
	{
		height: 0,
	},
	{
		height: content.offsetHeight + 'px',
	},
];

function initAccordionEvent(openFlag: boolean, accEl: HTMLDetailsElement, ingFlag?: boolean) {
	if (ingFlag) return; // 連打時のskip
	const containerEl = accEl.querySelector('.js-accordion-container') as HTMLElement;
	if (openFlag) {
		accEl.setAttribute('open', 'true');
		containerEl.classList.add(ACC_OPENED_CLASS);
	} else {
		containerEl.classList.remove(ACC_OPENED_CLASS);
	}
	const anim = containerEl.animate(openFlag ? openingAnimKeyframes(containerEl) : closingAnimKeyframes(containerEl), animationTiming);
	anim.onfinish = () => {
		ingFlag = false;
		!openFlag && accEl.removeAttribute('open');
	};
}

function initializeAccordion(accEl: HTMLDetailsElement) {
	let opened = false;
	// initial open case
	if (accEl.dataset.initialOpen === 'true') {
		opened = true;
		initAccordionEvent(opened, accEl);
	}

	// add click event
	const triggers = accEl.querySelectorAll('.js-accordion-trigger') as NodeListOf<HTMLButtonElement>;
	triggers.forEach((trigger: HTMLButtonElement) => {
		trigger.addEventListener('click', (e: MouseEvent) => {
			e.preventDefault();
			opened = !accEl.open;
			initAccordionEvent(opened, accEl);
		});
	});
}

window.addEventListener('DOMContentLoaded', () => {
	[].slice.call(document.querySelectorAll('.js-accordion')).forEach((el: HTMLDetailsElement) => initializeAccordion(el));
});
