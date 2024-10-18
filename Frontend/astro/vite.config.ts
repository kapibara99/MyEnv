// 主にStoryBook用の設定
import path from 'path';
import { defineConfig } from 'vite';

const pathResolve = (v: string) => path.resolve(__dirname, v);

// https://ja.vitejs.dev/config/shared-options.html
export default defineConfig({
	resolve: {
		// path alias setting
		alias: {
			'@': path.join(__dirname, './src'),
			'~': path.join(__dirname, './public'),
		},
	},
	publicDir: pathResolve('public'), // 静的アセット格納フォルダ

	assetsInclude: ['**/*.woff'], // 静的アセットとして扱う追加パターンを指定
});
