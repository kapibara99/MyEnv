import modules from './stories.html?raw'; // rawをパラメータで付与することで、HTMLファイルを静的文字列として取得できる
import './_style.scss';

export default {
	title: 'Components/molecules',
};

export const ProgressBar = () => {
	return modules;
};
