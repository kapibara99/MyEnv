import modules from './card.html?raw'; // rawをパラメータで付与することで、HTMLファイルを静的文字列として取得できる
import './_card.scss';
import './_radio_card.scss';

export default {
	title: 'Components/Molecules',
};

export const Card = () => {
	return modules;
};
