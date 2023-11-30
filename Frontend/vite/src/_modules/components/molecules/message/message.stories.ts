import modules from './message.html?raw'; // rawをパラメータで付与することで、HTMLファイルを静的文字列として取得できる
import './_message.scss';

export default {
	title: 'Components/Molecules',
};

export const Message = () => {
	return modules;
};
