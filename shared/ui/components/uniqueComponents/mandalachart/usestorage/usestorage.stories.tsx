import React, { useState, useEffect } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import useLocalStorage from './useStorage';
import { DEFAULT_CHART_DATA } from '../chart.functions';
import { MandalaCellProps } from '../chart';

// --- Helper Component for Demonstrating the Hook ---
const UseLocalStorageDemo: React.FC<{
	storageKey: string;
	initialDemoValue?: MandalaCellProps[];
}> = ({ storageKey, initialDemoValue }) => {
	const { storedValue, setStoredValue, localSetter } = initialDemoValue ? useLocalStorage(storageKey, initialDemoValue) : useLocalStorage(storageKey);

	const [inputValue, setInputValue] = useState<string>('');
	const [zahyouRow, setZahyouRow] = useState<number>(0);
	const [zahyouCol, setZahyouCol] = useState<number>(0);

	useEffect(() => {
		return () => {
			if (typeof window !== 'undefined' && window.localStorage) {
				localStorage.removeItem(storageKey);
			}
		};
	}, [storageKey]);

	const handleLocalSet = () => {
		if (!storedValue && !initialDemoValue) {
			alert('No data to update. Initialize with some data or provide initialDemoValue to the hook.');
			return;
		}
		const targetIndex = zahyouRow * 9 + zahyouCol;
		if (storedValue && (targetIndex < 0 || targetIndex >= storedValue.length)) {
			alert(`Index ${targetIndex} (Row: ${zahyouRow}, Col: ${zahyouCol}) is out of bounds for current storedValue length ${storedValue.length}. Adjust Zahyou or data.`);
			return;
		}
		if (!storedValue && initialDemoValue && (targetIndex < 0 || targetIndex >= initialDemoValue.length)) {
			alert(
				`Index ${targetIndex} (Row: ${zahyouRow}, Col: ${zahyouCol}) is out of bounds for initialDemoValue length ${initialDemoValue.length} (storedValue is currently undefined). Adjust Zahyou or data.`,
			);
			return;
		}

		localSetter(inputValue, [zahyouRow, zahyouCol]);
		setInputValue(''); // Clear input after setting
	};

	const handleSetNewValues = () => {
		const newValue: MandalaCellProps[] = [
			{
				cellType: 'item',
				isFocused: false,
				value: 'new value 01',
				zahyou: [0, 0],
			},
			{
				cellType: 'subTitle',
				isFocused: true,
				value: 'new value 02',
				zahyou: [0, 1],
			},
			{
				cellType: 'title',
				isFocused: false,
				value: 'new value 03',
				zahyou: [0, 2],
			},
		];
		setStoredValue(newValue);
	};

	const handleClearValues = () => {
		setStoredValue(undefined);
	};

	const handleResetToInitialHookValue = () => {
		setStoredValue(initialDemoValue);
	};

	return (
		<div>
			<h2>
				<code>useLocalStorage</code> Hook Demonstration
			</h2>
			<p>
				設定中のローカルストレージキー: <strong>{storageKey}</strong>
			</p>
			<p>
				初期値:
				<br />
				<pre
					style={{
						border: '1px solid #ccc',
						padding: '10px',
						backgroundColor: '#f9f9f9',
						maxHeight: '200px',
						overflowY: 'auto',
					}}>
					{JSON.stringify(initialDemoValue, null, 2) || 'undefined'}
				</pre>
			</p>

			<div>
				<strong>現在設定の値:</strong>
				<pre
					style={{
						border: '1px solid #ccc',
						padding: '10px',
						backgroundColor: '#f9f9f9',
						maxHeight: '200px',
						overflowY: 'auto',
					}}>
					{JSON.stringify(storedValue, null, 2) || 'undefined'}
				</pre>
			</div>

			<hr style={{ margin: '20px 0' }} />

			<h4>
				1. Modify with <code>localSetter(inputValue, zahyou)</code>
			</h4>
			<p>
				該当するセルデータの更新をかける. 座標の計算は<code>zahyou[0] * 9 + zahyou[1]</code>となる.
			</p>
			<div>
				<label style={{ marginRight: '15px' }}>
					Row (<code>zahyou[0]</code>):
					<input type="number" value={zahyouRow} onChange={e => setZahyouRow(parseInt(e.target.value, 10) || 0)} style={{ width: '60px', marginLeft: '5px' }} min="0" />
				</label>
				<label>
					Col (<code>zahyou[1]</code>):
					<input
						type="number"
						value={zahyouCol}
						onChange={e => setZahyouCol(parseInt(e.target.value, 10) || 0)}
						style={{ width: '60px', marginLeft: '5px' }}
						min="0"
						max="8" // Based on the `* 9 + zahyou[1]` logic
					/>
				</label>
			</div>
			<div style={{ marginTop: '10px' }}>
				<label>
					New Value for Cell:
					<input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder="Enter value" style={{ marginLeft: '5px', marginRight: '10px', minWidth: '200px' }} />
				</label>
			</div>
			<button onClick={handleLocalSet} style={{ marginTop: '10px' }}>
				Update Cell with <code>localSetter</code>
			</button>
			<p>
				<small>例： 5番目のデータなら、(Row:0, Col:5) 20番目のデータなら、(Row:2, Col:2).</small>
			</p>

			<hr style={{ margin: '20px 0' }} />

			<h4>
				2. Modify with <code>setStoredValue(newValue)</code>
			</h4>
			<button onClick={handleSetNewValues} style={{ marginRight: '10px' }}>
				配列ごとすげかえる
			</button>
			<button onClick={handleClearValues} style={{ marginRight: '10px' }}>
				undefinedでクリア
			</button>
			<button onClick={handleResetToInitialHookValue}>初期値に戻す</button>

			<hr style={{ margin: '20px 0' }} />
			<p>
				<strong>Note:</strong>
				<ul>
					<li>localStorage はブラウザ内で永続的に保存されます。これらのコントロールを介して行われた変更は、ブラウザの localStorage に書き込まれます。</li>
					<li>このデモでは、このストーリーから移動した際（アンマウント時）に、localStorage アイテムをクリーンアップしようとします。</li>
					<li>localStorage は、ブラウザの開発者ツール（通常は「アプリケーション＞ローカルストレージ」）から直接確認できます。</li>
				</ul>
			</p>
		</div>
	);
};

// --- Storybook Meta Configuration ---
const meta: Meta<typeof UseLocalStorageDemo> = {
	title: 'Unique/MandalaChart/useLocalStorage',
	component: UseLocalStorageDemo,
	tags: ['autodocs'],
	argTypes: {
		storageKey: {
			control: 'text',
			description: 'ローカルストレージキー',
		},
		initialDemoValue: {
			control: 'object',
			description: 'Type:MandalaCellProps[] 9*9マス=81個の程度の配列を想定しています。',
		},
	},
	parameters: {
		docs: {
			description: {
				component: `
ブラウザの localStorage に保持されるチャート状態を管理するためのカスタム フックです。
- React jotai 変数を localStorage アイテムと同期します。
- 初期化時に、localStorageから値の読み込みを試みます。見つからない場合は、引数のinitialValueもしくはデフォルト値を使用します。
- 返却
  - storedValue : MandalaCellProps[]
  - setStoredValue : useState setter 関数
  - localSetter : (newValue,zahyou) => 指定の座標の値更新関数
- このlocalSetter(inputValue, zahyou)関数は、配列value内の特定のオブジェクトのプロパティを更新するために設計されていますstoredValue。 を使用して対象のインデックスを計算しますzahyou[0] * 9 + zahyou[1]。
        `,
			},
		},
	},
};

export default meta;

// --- Story Definitions ---
type Story = StoryObj<typeof UseLocalStorageDemo>;

export const DefaultBehavior: Story = {
	name: 'Default (With Initial Value)',
	args: {
		storageKey: 'mandalachart-storage-default',
		initialDemoValue: DEFAULT_CHART_DATA(),
	},
	render: args => <UseLocalStorageDemo key={args.storageKey} {...args} />,
	parameters: {},
};
