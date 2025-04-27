import modules from './chart.html?raw'; // rawをパラメータで付与することで、HTMLファイルを静的文字列として取得できる
import './_chart.scss';
import './chart.index';

export default {
	title: 'Components/Organisms',
};

export const Chart = () => {
	return modules;
};
