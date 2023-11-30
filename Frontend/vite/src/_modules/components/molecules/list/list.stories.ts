import modules from './list.html?raw'; // rawをパラメータで付与することで、HTMLファイルを静的文字列として取得できる
import './_list.scss';

export default {
	title: 'Components/Molecules',
};

export const List = () => {
	return modules;
};
