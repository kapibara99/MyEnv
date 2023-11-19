import modules from './modules.html?raw'; // rawをパラメータで付与することで、HTMLファイルを静的文字列として取得できる

export default {
	title: 'Components/test',
};

export const TestModule = () => {
	return modules;
};
