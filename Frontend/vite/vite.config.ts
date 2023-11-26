import { defineConfig } from 'vite';
import path from 'path';

// @ts-expect-error no .d.ts modules
import vitePluginSsinc from 'vite-plugin-ssinc';

// local modules
import { exportedInputFiles } from './vite.config.modules'; // 生成したHTML page list
import { ejsHandler } from './vite.config.ejsHandle';

const pathResolve = (v: string) => path.resolve(__dirname, v);

// https://ja.vitejs.dev/config/shared-options.html
export default defineConfig({
	appType: 'mpa', // multi page app
	base: '/', // assetリソースのパス設定（HTML hrefは素で設定） 相対パスの場合は ./
	root: 'src', // document root HTMLを配置するフォルダをrootに設定する。
	resolve: {
		// path alias setting
		alias: [
			{ find: '@', replacement: pathResolve('src/_modules/') },
			{ find: '~', replacement: pathResolve('public/') },
			{ find: '#', replacement: pathResolve('src/') },
		],
	},
	publicDir: pathResolve('public'), // 静的アセット格納フォルダ

	// https://ja.vitejs.dev/config/server-options.html
	server: {
		port: 8080,
		host: true, // IPアドレスを有効
		open: true,
	},

	assetsInclude: ['**/*.woff'], // 静的アセットとして扱う追加パターンを指定
	build: {
		outDir: pathResolve('dist'),
		emptyOutDir: true, // dist内 clean
		cssCodeSplit: true, // cssファイルをチャンクごとに出力する
		minify: true, // default js の minify 設定
		cssMinify: true, // css minifyせずに出力する

		rollupOptions: {
			// pages html をinputする
			input: exportedInputFiles(),
			// ファイル出力設定
			output: {
				assetFileNames: (assetInfo: any) => {
					let extType = assetInfo.name.split('.')[1];
					if (/ttf|otf|eot|woff|woff2/i.test(extType)) {
						// Webフォントファイルの振り分け
						extType = 'fonts';
					} else if (/png|jpe?g|svg|webp|gif|tiff|bmp|ico/i.test(extType)) {
						// images
						extType = 'images';
					} else if (/mp4|flv|mov|wmv|webm|avi/i.test(extType)) {
						// video / movie file
						extType = 'movies';
					}
					// その他ファイル
					return `_shared/${extType}/[name][extname]`;
				},
				chunkFileNames: '_shared/js/[name].js',
				entryFileNames: '_shared/js/[name].js',
			},
		},
	},
	json: {
		// json静的タイプ追加
		stringify: true,
	},
	plugins: [
		// if development build , convert ssi
		// https://www.npmjs.com/package/vite-plugin-ssinc
		(() => {
			if (process.env.NODE_ENV !== 'production') {
				return vitePluginSsinc({
					includeExtensions: ['shtml', 'html'],
				});
			}
		})(),

		// like EJS template HTML value
		ejsHandler(),
	],
	css: {
		transformer: 'postcss',
		modules: {
			scopeBehaviour: 'local',
		},
	},
});
