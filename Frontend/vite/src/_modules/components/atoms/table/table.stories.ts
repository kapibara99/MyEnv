import modules from './table.html?raw'; // rawをパラメータで付与することで、HTMLファイルを静的文字列として取得できる

export default {
	title: 'Components/Atoms',
};

export const BasicTable = () => {
	return modules;
};
