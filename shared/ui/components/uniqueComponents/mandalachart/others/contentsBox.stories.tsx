import { Meta, StoryObj } from '@storybook/react';
import ContentBox from './contentBox';

// --- Storybook Meta Configuration ---
const meta: Meta<typeof ContentBox> = {
  title: 'Unique/MandalaChart/Others/ContentBox',
  component: ContentBox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### ContentBox コンポーネント

タイトルと子コンテンツを受け取り、スタイリングされたボックス内に表示します。
主に Tailwind CSS のクラスユーティリティを使用してレイアウトとデザインが構成されています。
-   最大幅 (\`max-w-3xl\`) と中央揃え (\`mx-auto\`)
-   パディング (\`py-10 px-4 md:px-20\`)
-   背景色 (\`bg-white\`) と影 (\`shadow-xl\`)
-   角丸 (\`rounded-lg\`)
-   タイトルは \`h2\` タグで表示され、特定のスタイルが適用されます。

このコンポーネントは、ページ内のセクションや主要な情報ブロックを囲むのに適しています。
        `,
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'コンテンツボックスの上部に表示されるタイトル文字列。',
    },
    children: {
      control: 'object',
      description: 'ボックス内に表示される主要なコンテンツ (ReactNode)。',
    },
  },
};

export default meta;

// --- Story Definitions ---
type Story = StoryObj<typeof ContentBox>;

export const DefaultWithTextContent: Story = {
  name: 'テキストコンテンツ',
  args: {
    title: 'ようこそ！ContentBoxへ',
    children: (
      <>
        <p className="text-gray-700 leading-relaxed">
          これは <code>ContentBox</code> コンポーネント内に表示される基本的なテキストコンテンツです。
          Tailwind CSS を使用して、読みやすくスタイリッシュなレイアウトを提供します。
        </p>
        <p className="text-gray-700 leading-relaxed mt-4">
          このボックスは、情報を整理し、視覚的に魅力的な方法で提示するのに役立ちます。
          タイトルと本文の組み合わせで、様々な用途に対応できます。
        </p>
        <ul className="list-disc list-inside mt-4 text-gray-700">
          <li>リストアイテム 1</li>
          <li>リストアイテム 2</li>
          <li>リストアイテム 3</li>
        </ul>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: '基本的なテキストとリストを含むコンテンツを表示する例です。タイトルの表示と子要素の配置を確認します。',
      },
    },
  },
};
