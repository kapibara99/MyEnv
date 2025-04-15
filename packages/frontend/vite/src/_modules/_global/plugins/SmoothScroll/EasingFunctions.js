export const EasingFunctions = {
	linear(t) {
		return t;
	},
	easeInQuad(t) {
		return t * t;
	},
	easeOutQuad(t) {
		return t * (2 - t);
	},
	easeInOutQuad(t) {
		return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
	},
	easeInCubic(t) {
		return t * t * t;
	},
	easeOutCubic(n) {
		let t = n;
		t = (t -= 1) * t * t + 1;
		return t;
	},
	easeInOutCubic(t) {
		return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
	},
	easeInQuart(t) {
		return t * t * t * t;
	},
	easeOutQuart(n) {
		let t = n;
		t = 1 - (t -= 1) * t * t * t;
		return t;
	},
	easeInOutQuart(n) {
		let t = n;
		t = t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (t -= 1) * t * t * t;
		return t;
	},
	easeInQuint(t) {
		return t * t * t * t * t;
	},
	easeOutQuint(n) {
		let t = n;
		t = 1 + (t -= 1) * t * t * t * t;
		return t;
	},
	easeInOutQuint(n) {
		let t = n;
		t = t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (t -= 1) * t * t * t * t;
		return t;
	},
};
