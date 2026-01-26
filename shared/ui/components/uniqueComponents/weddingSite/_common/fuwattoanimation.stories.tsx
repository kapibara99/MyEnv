import type { Meta, StoryObj } from '@storybook/react';
import FuwattoAnimation from './FuwattoAnimationMessage';

const meta: Meta<typeof FuwattoAnimation> = {
	component: FuwattoAnimation,
	title: 'Unique/WeddingSite/Common/FuwattoAnimation',
	tags: ['autodocs'],
	argTypes: {
		message: { control: 'text' },
	},
	parameters: {
		docs: {
			description: {
				component: '子要素をふわっと表示させるためのアニメーションコンポーネントです。',
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof FuwattoAnimation>;

export const Default: Story = {
	args: {
		message: 'これはふわっと表示されるメッセージです。',
	},
};
