import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './header';

const meta: Meta<typeof Header> = {
	component: Header,
	title: 'Unique/WeddingSite/Common/Header',
	decorators: [
		Story => (
			<MemoryRouter>
				<Story />
			</MemoryRouter>
		),
	],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {};
