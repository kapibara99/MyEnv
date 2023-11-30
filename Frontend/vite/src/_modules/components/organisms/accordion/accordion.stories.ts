import modules from './accordion.html?raw'; // rawをパラメータで付与することで、HTMLファイルを静的文字列として取得できる
import './_accordion.scss';

export default {
	title: 'Components/Organisms',
};

export const Accordion = () => {
	return modules;
};
