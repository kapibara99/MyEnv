import type { Meta, StoryObj } from '@storybook/react';
import DisplayFullSizeLoading from './loading';

const meta: Meta<typeof DisplayFullSizeLoading> = {
	component: DisplayFullSizeLoading,
	title: 'Unique/WeddingSite/Common/Loading',
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component: '全画面に表示されるローディングインジケーターです。Suspenseのfallbackなどで使用します。',
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof DisplayFullSizeLoading>;

export const Default: Story = {
	name: 'Full Screen Loading',
};
