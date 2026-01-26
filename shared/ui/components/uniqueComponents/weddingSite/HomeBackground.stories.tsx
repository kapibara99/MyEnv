import type { Meta, StoryObj } from '@storybook/react';
import HomeBackground from './HomeBackground';

const meta: Meta<typeof HomeBackground> = {
	component: HomeBackground,
	title: 'Unique/WeddingSite/HomeBackground',
};

export default meta;
type Story = StoryObj<typeof HomeBackground>;

export const Default: Story = {
	args: {
		children: <div className="p-10 mt-30 text-center min-h-[200vh]">Home Background Content Area</div>,
	},
};
