import type { Meta, StoryObj } from '@storybook/react';
import ContentsBase from './ContentsBase';

const meta: Meta<typeof ContentsBase> = {
	component: ContentsBase,
	title: 'Unique/WeddingSite/ContentsBase',
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ContentsBase>;

export const Default: Story = {
	args: {
		children: <div className="p-10 text-center">Contents Base Content Area</div>,
	},
};
