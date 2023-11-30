import modules from './template.html?raw'; // rawをパラメータで付与することで、HTMLファイルを静的文字列として取得できる
import './_template.scss';

export default {
	title: 'Components/test',
};

export const TestModule = () => {
	return modules;
};
