import modules from './typography.html?raw'; // rawをパラメータで付与することで、HTMLファイルを静的文字列として取得できる
import './typography.scss';

export default {
	title: 'Components/Atoms',
};

export const Typography = () => {
	return modules;
};
