import { Meta, StoryObj } from '@storybook/react';
import AdmaxContent from './admaxContents';

// --- Storybook Meta Configuration ---
const meta: Meta<typeof AdmaxContent> = {
  title: 'Unique/MandalaChart/Others/AdmaxContent',
  component: AdmaxContent,
  tags: ['autodocs'],
  argTypes: {
    admaxID: {
      control: 'text',
      description: 'Admax 広告ユニットのID。本番環境で広告を読み込む際に使用されます。',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
### AdmaxContent コンポーネント

指定された Admax ID に基づいて広告コンテンツを表示します。
-   **開発モード時 (\`import.meta.env.DEV === true\`):** 広告箇所にダミー画像を表示します。
-   **本番モード時 (\`import.meta.env.DEV === false\`):** Admax のスクリプトを動的に読み込み、指定された \`admaxID\` の広告を表示しようとします。
    -   スクリプトの読み込みとクリーンアップは \`useEffect\` フック内で行われます。
    -   \`window.admaxads\` 配列に広告設定をプッシュします。

**注意:** Storybook では、実際の広告は表示されません。
        `,
      },
    },
  },
};

export default meta;

// --- Story Definitions ---
export const AdmaxContentStory: StoryObj<typeof AdmaxContent> = {
  name: 'AdmaxContent',
  args: {
    admaxID: 'test-admax-id-dev',
  },
  parameters: {
    docs: {
    },
  },
};

