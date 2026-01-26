import type { Meta, StoryObj } from '@storybook/react';
import { useTour } from '@reactour/tour';
// import React from 'react';
import Tour from './Tour'; // tour.tsxからTourProviderを含むコンポーネントをインポートすると仮定
import ImageAlbum from '../album';

// ツアーを開始するためのヘルパーコンポーネント
const TourLauncher = () => {
	const { setIsOpen } = useTour();
	return (
		<div className="p-4">
			<button type="button" onClick={() => setIsOpen(true)} className="rounded bg-blue-500 p-2 text-white">
				ツアーを開始
			</button>
		</div>
	);
};

const meta: Meta<typeof Tour> = {
	component: Tour,
	title: 'Unique/WeddingSite/Tour',
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component: 'サイトの機能を紹介するツアー機能のコンポーネントです。子要素としてツアーの対象となるコンテンツと、ツアーを開始するボタンを配置します。',
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof Tour>;

export const Default: Story = {
	render: args => (
		<Tour {...args}>
			<ImageAlbum />
			<TourLauncher />
		</Tour>
	),
};
