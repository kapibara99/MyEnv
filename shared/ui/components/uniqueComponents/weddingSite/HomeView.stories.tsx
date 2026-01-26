import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import SiteHomeView from './HomeView';

const meta: Meta<typeof SiteHomeView> = {
	component: SiteHomeView,
	title: 'Unique/WeddingSite/HomeView',
	decorators: [
		Story => (
			<MemoryRouter>
				<Story />
			</MemoryRouter>
		),
	],
};

export default meta;
type Story = StoryObj<typeof SiteHomeView>;

export const Default: Story = {};
