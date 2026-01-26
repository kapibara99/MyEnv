import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { LinkMenu } from './linkMenu';

const meta: Meta<typeof LinkMenu> = {
	component: LinkMenu,
	title: 'Unique/WeddingSite/Common/LinkMenu',
	decorators: [
		Story => (
			<MemoryRouter>
				<Story />
			</MemoryRouter>
		),
	],
};

export default meta;
type Story = StoryObj<typeof LinkMenu>;

export const Default: Story = {};
