type AdmaxAdType = {
	admax_id: string; // 広告ID
	type: string; // PC/SP切替広告なら"switch"
};
interface Window {
	admaxads?: AdmaxAdType[];
	__admax_tag__?: { [key: string]: unknown }[];
}
