import type { Meta, StoryObj } from '@storybook/react';
import ContentBox from './contentBox';

const meta: Meta<typeof ContentBox> = {
	component: ContentBox,
	title: 'Unique/WeddingSite/Common/ContentBox',
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ContentBox>;

export const Default: Story = {
	args: {
		title: 'Sample Title',
		children: <p>This is the content inside the box.</p>,
	},
};

export const NoTitle: Story = {
	args: {
		title: '',
		children: <p>This box has no title.</p>,
	},
};
