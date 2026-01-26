import type { Meta, StoryObj } from '@storybook/react';
import Icon from './icon';

const meta: Meta<typeof Icon> = {
	component: Icon,
	title: 'Unique/WeddingSite/Common/Icon',
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Home: Story = {
	args: {
		iconName: 'home',
	},
};

export const Dinner: Story = {
	args: {
		iconName: 'dinner',
	},
};

export const Guide: Story = {
	args: {
		iconName: 'guide',
	},
};

export const Album: Story = {
	args: {
		iconName: 'album',
	},
};
