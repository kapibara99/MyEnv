import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
	integrations: [
		react({
			experimentalReactChildren: true,
		}),
	],
	build: {
		inlineStylesheets: 'never', // https://docs.astro.build/ja/reference/configuration-reference/#buildinlinestylesheets
	},
	vite: {
		build: {
			rollupOptions: {
				output: {
					// 細かいディレクトリ指定をしたいなら、下記を参照
					// https://cumak.net/blog/astro-build-css/
					assetFileNames: assetInfo => {
						let extType = assetInfo.name.split('.')[1];
						if (/ttf|otf|eot|woff|woff2/i.test(extType)) {
							extType = 'fonts';
						}
						if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
							extType = 'images';
						}
						return `_assets/${extType}/[name][extname]`;
					},
				},
			},
		},
	},
});
