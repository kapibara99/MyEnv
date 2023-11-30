import modules from './form-parts.html?raw'; // rawをパラメータで付与することで、HTMLファイルを静的文字列として取得できる

export default {
	title: 'Components/Atoms',
};

export const BasicFormParts = () => {
	return modules;
};
