import modules from './stories.html?raw'; // rawをパラメータで付与することで、HTMLファイルを静的文字列として取得できる
import './_style.scss';

export default {
	title: 'Components/Organisms',
};

export const SideContainer = () => {
	return modules;
};
