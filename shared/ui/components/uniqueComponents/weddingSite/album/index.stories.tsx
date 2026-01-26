import type { Meta, StoryObj } from '@storybook/react';
import ImageAlbum from './index';

const meta: Meta<typeof ImageAlbum> = {
	component: ImageAlbum,
	title: 'Unique/WeddingSite/Album',
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component: `
\`Album\` は、新郎新婦の小さい時の写真などが閲覧できるものとして、結婚式参列者用に展開されました。

**主な機能:**
-   **data.json**を参照し、所属するデータを読み込んだうえで、画像を一覧表示、クリック後の詳細表示を行うことができます。
-   **タグ切り替え**:読み込んだJSONデータに内在するタグ情報でフィルタリングソートが可能です。
	`,
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof ImageAlbum>;

export const Default: Story = {};
