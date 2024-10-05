import { BasicHeading1, BasicHeading2, BasicHeading3, BasicHeading4, BasicHeading5, bodyText, leadText } from './typography';

export default {
	title: 'Components/Atoms/Typography',
	tags: ['autodocs'],
	args: {
		text: 'text test',
	},
	// argTypes: {
	// 	fontSize: { control: 'number' },
	// },
};

export const Heading1 = BasicHeading1;
export const Heading2 = BasicHeading2;
export const Heading3 = BasicHeading3;
export const Heading4 = BasicHeading4;
export const Heading5 = BasicHeading5;
export const text = bodyText;
export const lead = leadText;
