import modules from './form-parts.html?raw'; // rawをパラメータで付与することで、HTMLファイルを静的文字列として取得できる
import './form-parts.scss';

export default {
	title: 'Components/Atoms',
};

export const FormParts = () => {
	return modules;
};
