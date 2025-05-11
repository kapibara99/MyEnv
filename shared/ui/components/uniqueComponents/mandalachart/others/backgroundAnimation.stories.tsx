import { Meta, StoryObj } from '@storybook/react';
import BackendCircleAnimation from './backgroundAnimation';

// --- Storybook Meta Configuration ---
const meta: Meta<typeof BackendCircleAnimation> = {
  title: 'Unique/MandalaChart/Others/BackendCircleAnimation',
  component: BackendCircleAnimation,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### BackendCircleAnimation コンポーネント

ページやセクションの背景に、拡大していく3つの円形アニメーションを表示します。
これらのアニメーションは異なる色（\`border-main-light\`, \`border-main\`, \`border-main-strong\`）と
異なる開始遅延（\`animation-delay-xxxx\`）を持ちます。

子要素 (\`children\`) は、これらのアニメーションの手前 (\`z-1\`) に表示されるように設計されています。
アニメーション自体は \`z-0\` のコンテナ内に配置されます。
        `,
      },
    },
  },
  argTypes: {
    children: {
      control: false,
      description: 'アニメーションの手前に表示されるコンテンツ (ReactNode)。',
    },
  },
};

export default meta;

// --- Story Definitions ---
type Story = StoryObj<typeof BackendCircleAnimation>;

export const BackendCircleAnimationStory: Story = {
  name: 'コンテンツあり (デフォルト)',
  args: {
    children: (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh', // ビューポートに対してコンテンツが中央に来るように
        padding: '20px',
        textAlign: 'center',
        // 背景アニメーションが見やすいように、コンテンツの背景を少し透過させるか、明確に区切る
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        maxWidth: '600px',
        margin: '0 auto', // layout: 'fullscreen' の中で中央寄せ
      }}>
        <h1>メインコンテンツ</h1>
        <p style={{ marginTop: '10px' }}>
          このエリアは <code>BackendCircleAnimation</code> の子要素として表示されています。
          背景では円形のアニメーションがループしています。
        </p>
        <button
          type="button"
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          ダミーボタン
        </button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: '基本的な使用例です。子要素としてダミーのコンテンツを配置し、背景のアニメーションがどのように見えるかを確認します。',
      },
    },
  },
};
