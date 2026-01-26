import Cookies from 'js-cookie';
export function CheckTourShown(): boolean {
	return Cookies.get('albumTourShown') === 'true';
}
export function setTourShown(): void {
	// set cookie that tour has been shown for 1 year
	Cookies.set('albumTourShown', 'true', { expires: 365 });
}
