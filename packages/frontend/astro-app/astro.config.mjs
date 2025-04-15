import react from '@astrojs/react';
import compress from 'astro-compress'; // ファイル圧縮
import purgecss from 'astro-purgecss'; // 使ってないstyleなどを削除する
import { defineConfig } from 'astro/config';
// postcss
import autoprefixer from 'autoprefixer'; // 自動ベンダープレフィックス
import cssnano from 'cssnano';

// https://astro.build/config
export default defineConfig({
	integrations: [
		react({
			experimentalReactChildren: true,
		}),
		compress(),
		purgecss(),
	],
	build: {
		// https://docs.astro.build/ja/reference/configuration-reference/
		inlineStylesheets: 'never',
		format: 'preserve',
		assets: '_assets',
	},
	vite: {
		css: {
			postcss: {
				plugins: [
					autoprefixer({}),
					cssnano({
						preset: [
							'default',
							{
								autoprefixer: false,
								minifyFontValues: {
									removeQuotes: false,
								},
							},
						],
					}),
				],
			},
			preprocessorOptions: {
				scss: {
					// css変数を保管するためにインポートする
					additionalData: `@use "src/styles/_variables.scss";`,
					api: 'modern-compiler',
				},
			},
		},
		build: {
			minify: false, // astro-compressを採用するため、vite側を無効化
			rollupOptions: {
				output: {
					// assetのファイル名や細かいディレクトリ指定を行う
					// 参考) https://cumak.net/blog/astro-build-css/
					assetFileNames: assetInfo => {
						let extType = assetInfo.name.split('.')[1];
						let fileName = assetInfo.name;
						if (/css/i.test(extType)) {
							//assetInfo.sourceの中から文字列を探して値を取得する
							let firstLine = assetInfo.source.split(/\/\*|\*\//).find(line => line.includes('buildOutputFile:'));
							if (firstLine) {
								firstLine = firstLine.split('buildOutputFile:')[1].trim();
								//ダブルクォーテーションとセミコロンとスペースを削除
								fileName = firstLine.replace(/['";\s]/g, '') + '.css';
							} else {
								//「-index」を削除したファイル名を取得
								fileName = fileName.replace('-index', '');
							}
						} else if (/ttf|otf|eot|woff|woff2/i.test(extType)) {
							extType = 'fonts';
						} else if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
							extType = 'images';
						}
						return `_assets/${extType}/${fileName}`;
					},
				},
			},
		},
	},
});
