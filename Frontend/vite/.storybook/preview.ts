import type { Preview } from '@storybook/html';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		viewport: {
			viewports: INITIAL_VIEWPORTS,
		},
	},
};

export default preview;
