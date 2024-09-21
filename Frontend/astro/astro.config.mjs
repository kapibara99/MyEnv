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
		// https://docs.astro.build/ja/reference/configuration-reference/
		inlineStylesheets: 'never',
		format: 'preserve',
	},
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					// css変数を保管するためにインポートする
					additionalData: `
						@use "src/styles/_variables.scss";`,
				},
			},
		},
		build: {
			rollupOptions: {
				output: {
					// assetのファイル名や細かいディレクトリ指定を行う
					// 参考) https://cumak.net/blog/astro-build-css/
					assetFileNames: assetInfo => {
						let extType = assetInfo.name.split('.')[1];
						let fileName = '';
						if (/css/i.test(extType)) {
							//assetInfo.sourceの中から文字列を探して値を取得する
							let firstLine = assetInfo.source.split(/\/\*|\*\//).find(line => line.includes('buildOutputFile:'));
							if (firstLine) {
								firstLine = firstLine.split('buildOutputFile:')[1].trim();
								//ダブルクォーテーションとセミコロンとスペースを削除
								fileName = firstLine.replace(/['";\s]/g, '') + '.css';
								// buildOutputFileを削除
								assetInfo.source = assetInfo.source.replace(/\/\*\s?\n?!\s*buildOutputFile:\s?[a-z|A-Z|0-9._-]+\s?\n?\s?\*\//g, '');
							} else {
								//「-index」を削除したファイル名を取得
								fileName = assetInfo.name.replace('-index', '');
							}
						} else if (/ttf|otf|eot|woff|woff2/i.test(extType)) {
							extType = 'fonts';
						} else if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
							extType = 'images';
						}
						const srcPath = fileName !== '' ? `_assets/${extType}/${fileName}` : `_assets/${extType}/[name][extname]`;
						return srcPath;
					},
				},
			},
		},
	},
});
