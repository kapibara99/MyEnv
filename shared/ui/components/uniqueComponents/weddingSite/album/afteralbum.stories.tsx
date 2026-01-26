import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import ImageAlbum from './afterAlbum';

const meta: Meta<typeof ImageAlbum> = {
	component: ImageAlbum,
	title: 'Unique/WeddingSite/AfterAlbum',
	tags: ['autodocs'],
	decorators: [
		Story => (
			<MemoryRouter>
				<Story />
			</MemoryRouter>
		),
	],
	parameters: {
		docs: {
			description: {
				component: `
\`AfterAlbum\` は、新郎新婦の小さい時の写真などが閲覧できるものとして、結婚式後、知人用に展開予定でした。

**主な機能:**
-   **Album コンポーネント**から、パフォーマンスの向上を行っています。ファイルは未整理ですが、基本的に構成はAfterAlbumが再審で整理されていると思います。
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
