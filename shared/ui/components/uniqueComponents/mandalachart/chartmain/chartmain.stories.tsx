import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'jotai';
import ChartMain from './chartMain'; // ChartMain.tsx のパス
import { STORAGE_KEY, CHART_MAIN_ID } from '../chart.functions';

// Jotai アトムの値をストーリー引数から設定するためのラッパーコンポーネント
const JotaiStoryWrapper: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	return <>{children}</>;
};

// --- Storybook Meta Configuration ---
const meta: Meta<typeof ChartMain> = {
	title: 'Unique/MandalaChart/ChartMain',
	component: ChartMain,
	tags: ['autodocs'],
	argTypes: {},
	decorators: [
		Story => {
			return (
				<Provider>
					<JotaiStoryWrapper>
						<Story />
						<div style={{ marginTop: '20px', padding: '10px', border: '1px solid #eee', fontSize: '0.9em' }}>
							<p>
								<strong>デバッグ情報:</strong>
							</p>
							<p>
								localStorage キー: <code>{STORAGE_KEY}</code>
							</p>
							<p>
								チャート全体の幅 (<code>id="{CHART_MAIN_ID}"</code>): セルサイズ × 9
							</p>
						</div>
					</JotaiStoryWrapper>
				</Provider>
			);
		},
	],
	parameters: {
		docs: {
			description: {
				component: `
### ChartMain コンポーネント

マンダラチャートのメイン表示エリアを担当するコンポーネントです。
-   9x9 のグリッドレイアウトで各 \`MandalaCell\` を表示します。
-   各セルのデータは \`useLocalStorage\` フックを通じて localStorage から読み込まれ、永続化されます。
-   セルのサイズは Jotai アトム (\`chartCellSizeAtom\`) によって管理され、チャート全体の幅もこれに連動します。
-   \`ChartStyleDefault\` コンポーネントによって基本的なスタイルが適用されます。
        `,
			},
		},
	},
};

export default meta;

// --- Story Definitions ---
type Story = StoryObj<typeof meta>; // argTypes に基づく型

export const DefaultView: Story = {
	name: 'デフォルト表示',
	parameters: {
		docs: {
			description: {
				story: `
localStorage が空の状態で \`ChartMain\` を表示します。
この場合、\`useLocalStorage\` フックは初期値として \`DEFAULT_CHART_DATA()\` を使用します。
セルのサイズはデフォルト値 (例: 120px) に設定されます。
        `,
			},
		},
	},
};
