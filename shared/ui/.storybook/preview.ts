import type { Preview } from '@storybook/react';
import './css/base.css';
import './css/tailwind.css';
import './css/weddingsite.css';

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export default preview;
