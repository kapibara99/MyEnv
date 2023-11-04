module.exports = {
	plugins: {
		'postcss-normalize-charset': {}, // add charset (アスキー文字がある場合のみに付与される)
		autoprefixer: {}, // prefix
		'postcss-sort-media-queries': {}, // media queryを統一にしてくれる
		// props sort smacss or concentric-css , alphabetical // https://www.npmjs.com/package/css-declaration-sorter
		'css-declaration-sorter': { order: 'concentric-css' },
		'@fullhuman/postcss-purgecss': {
			// 使用していないcss を一切合切、排除する
			content: ['./src/**/*.html', './src/**/*.js', './src/**/*.ts'],
			// 除外設定 https://purgecss.com/safelisting.html
			// safelist: ["hoge"],
		},
	},
};
