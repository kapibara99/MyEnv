import type { Meta, StoryObj } from '@storybook/react';
import HomeCarousel from './HomeCarouselView';

const meta: Meta<typeof HomeCarousel> = {
	component: HomeCarousel,
	title: 'Unique/WeddingSite/HomeCarouselView',
};

export default meta;
type Story = StoryObj<typeof HomeCarousel>;

export const Default: Story = {};
