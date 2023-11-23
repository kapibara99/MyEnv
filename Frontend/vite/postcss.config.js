import autoprefixer from 'autoprefixer';
import postcssNormalizeCharset from 'postcss-normalize-charset';
import postcssSortMediaQueries from 'postcss-sort-media-queries';
import stylelint from 'stylelint';

export default {
	plugins: [
		autoprefixer(), // prefix
		postcssNormalizeCharset(), // add charset (アスキー文字がある場合のみに付与される)
		postcssSortMediaQueries(), // media queryを統一にしてくれる
		stylelint({
			// stulint設定を踏襲する
			configFile: './.stylelintrc.cjs',
			fix: true,
		}),

		// '@fullhuman/postcss-purgecss': {// storybookと相性悪くなるのでコメントアウト
		// 	// 使用していないcss を一切合切、排除する
		// 	// content: [
		// 	// 	// {
		// 	// 	// 	pattern: './src/**/*[!stories].ts',
		// 	// 	// },
		// 	// ],
		// 	// 除外設定 https://purgecss.com/safelisting.html
		// 	// safelist: ["hoge"],
		// },
	],
};
