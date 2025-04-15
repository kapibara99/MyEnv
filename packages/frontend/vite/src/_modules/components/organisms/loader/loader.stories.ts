import modules from './loader.html?raw'; // rawをパラメータで付与することで、HTMLファイルを静的文字列として取得できる
import './_loader.scss';

export default {
	title: 'Components/Organisms',
};

export const Loader = () => {
	return modules;
};
