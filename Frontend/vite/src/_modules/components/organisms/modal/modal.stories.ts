import modules from './modal.html?raw'; // rawをパラメータで付与することで、HTMLファイルを静的文字列として取得できる
import './_modal.scss';
import './modal';

export default {
	title: 'Components/Organisms',
};

export const Modal = () => {
	return modules;
};
