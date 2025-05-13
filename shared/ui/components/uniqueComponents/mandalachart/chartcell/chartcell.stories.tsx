import React, { useEffect } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Provider, useSetAtom } from 'jotai';
import MandalaCell from './chartcell';
import type { MandalaCellProps } from '../chart';
import { chartBgColorAtom, chartFontColorAtom } from '../atoms';
import { STORAGE_KEY } from '../chart.functions';

const JotaiStoryWrapper: React.FC<{
	children: React.ReactNode;
	initialBgColor?: string;
	initialFontColor?: string;
}> = ({ children, initialBgColor, initialFontColor }) => {
	const setBgColor = useSetAtom(chartBgColorAtom);
	const setFontColor = useSetAtom(chartFontColorAtom);

	useEffect(() => {
		setBgColor(initialBgColor || '#FFFFFF'); // デフォルトは白背景
		setFontColor(initialFontColor || '#000000'); // デフォルトは黒文字
	}, [initialBgColor, initialFontColor, setBgColor, setFontColor]);

	return <>{children}</>;
};

// --- Storybook Meta Configuration ---
const meta: Meta<typeof MandalaCell> = {
	title: 'Unique/MandalaChart/MandalaCell',
	component: MandalaCell,
	tags: ['autodocs'],
	argTypes: {
		cellType: {
			control: 'select',
			options: ['item', 'title', 'subTitle'],
			description: 'マンダラセルのタイプ。スタイルや動作に影響します。',
		},
		value: {
			control: 'text',
			description: 'セルの初期表示値。編集時にはこの値が localStorage に書き込まれます。',
		},
		zahyou: {
			control: 'object',
			description: 'セルの座標 [行, 列]。位置決め、データインデックス、ツールチップ表示位置に使用されます。',
		},
		isFocused: {
			control: 'boolean',
			description: 'セルの初期フォーカス状態を設定します。初期描画後はコンポーネント内部でフォーカスを管理します。',
		},
	},
	decorators: [
		Story => {
			return (
				<Provider>
					<JotaiStoryWrapper>
						<div style={{ width: '150px', minHeight: '60px', border: '1px dashed #ccc', margin: '20px', padding: '0', display: 'flex', alignItems: 'stretch', justifyContent: 'stretch' }}>
							<div style={{ flexGrow: 1 }}>
								<Story />
							</div>
						</div>
						<p style={{ fontSize: '0.8em', marginTop: '5px', marginLeft: '20px', color: '#555' }}>
							localStorage キー: <strong>{STORAGE_KEY}</strong> と連携します。 ツールチップの位置は <code>zahyou</code> に依存します。
						</p>
					</JotaiStoryWrapper>
				</Provider>
			);
		},
	],
	parameters: {
		docs: {
			description: {
				component: `
\`MandalaCell\` は、マンダラチャートを構成するインタラクティブなセルです。

**主な機能:**
-   **値の表示と編集**: セル内に値を表示し、クリックすることで表示されるテキストエリアツールチップを介して値を編集できます。
-   **動的なスタイリング**:
    -   \`cellType\` プロパティ (\`item\`, \`title\`, \`subTitle\`) に応じて基本スタイルが変化します。
    -   Jotai アトム (\`chartBgColorAtom\`, \`chartFontColorAtom\`) を通じて、チャート全体の背景色や文字色を一元的に管理・反映できます。
    -   \`zahyou\` (座標) に基づいて、\`subTitle\` タイプのセルの境界線色が変化したり、編集ツールチップの表示位置が調整されたりします。
-   **localStorage への永続化**: 編集されたセルの値は、キー \`${STORAGE_KEY}\` を使用して \`useLocalStorage\` フック経由でブラウザの localStorage に自動的に保存され、ページをリロードしても状態が保持されます。
-   **\`subTitle\` セルの同期**: \`subTitle\` タイプのセルは特別な動作を持ち、値が編集されると、関連する別のセルの値も同時に更新する同期処理が行われます。これはカスタムイベント \`addChartCellSynchronizeEvent\` の呼び出しによって実現されます。
`,
			},
		},
	},
};

export default meta;

// --- Story Definitions ---
type Story = StoryObj<MandalaCellProps>;

const defaultCellArgs: Partial<MandalaCellProps> = {
	value: 'セル値',
	isFocused: false,
};

export const ItemCell: Story = {
	name: 'タイプ: Item (通常セル)',
	args: {
		...defaultCellArgs,
		cellType: 'item',
		value: '標準アイテム',
		zahyou: [1, 2],
	},
	parameters: {
		docs: {
			description: { story: '最も基本的な `item` タイプのセルです。デフォルトの境界線スタイルが適用されます。' },
		},
	},
};

export const TitleCell: Story = {
	name: 'タイプ: Title (タイトルセル)',
	args: {
		...defaultCellArgs,
		cellType: 'title',
		value: 'メインタイトル',
		zahyou: [4, 4], // 通常は中央のセル
	},
	parameters: {
		docs: {
			description: { story: 'チャートの中央などに配置される `title` タイプのセルです。固有の境界線スタイル (`border-main` クラス) が適用され、HTML要素には `id="center-cell"` が付与されます。' },
		},
	},
};

export const SubTitleCell: Story = {
	name: 'タイプ: SubTitle (サブタイトルセル)',
	args: {
		...defaultCellArgs,
		cellType: 'subTitle',
		value: 'セクションサブタイトル',
		zahyou: [1, 4], // 例: 上部中央ブロックのサブタイトル
	},
	parameters: {
		docs: {
			description: {
				story: '各ブロックの中心などに配置される `subTitle` タイプのセルです。このセルの値を編集すると、関連する他のセルとの同期処理がトリガーされます。',
			},
		},
	},
};

export const FocusedState: Story = {
	name: '状態: フォーカス時',
	args: {
		...defaultCellArgs,
		cellType: 'item',
		value: '初期フォーカスされたセル',
		zahyou: [2, 3],
		isFocused: true,
	},
	parameters: {
		docs: {
			description: { story: '`isFocused` プロパティが `true` の場合のセルの外観 (フォーカス状態を示す境界線) と動作 (編集用のテキストエリアが初期表示される) を示します。' },
		},
	},
};
