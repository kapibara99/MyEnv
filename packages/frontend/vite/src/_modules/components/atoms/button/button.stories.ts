import modules from './button.html?raw'; // rawをパラメータで付与することで、HTMLファイルを静的文字列として取得できる

export default {
	title: 'Components/Atoms',
};

export const BasicButton = () => {
	return modules;
};
