import type { Meta, StoryObj } from '@storybook/react';
import Base from './base';

const meta: Meta<typeof Base> = {
	component: Base,
	title: 'Unique/WeddingSite/Common/Base',
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Base>;

export const Default: Story = {
	args: {
		children: <div className="p-10 text-center">Base Content Area</div>,
	},
};
