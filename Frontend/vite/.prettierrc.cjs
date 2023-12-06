module.exports = {
	// https://prettier.io/docs/en/options
	// https://prettier.io/docs/en/ignore
	printWidth: 200,
	tabWidth: 2,
	useTabs: true,
	singleQuote: true,
	semi: true,
	trailingComma: 'all', // 末尾のカンマ
	bracketSpacing: true, // {}　のなかのスペーシング
	bracketSameLine: true, // 属性値を立て揃えにする
	arrowParens: 'avoid', // 変数一つのアロー関数は、（）を省略する
	endOfLine: 'auto', // lf|crlf|cr|auto
	embeddedLanguageFormatting: 'off', // 埋め込みコードの書式変更を行うかどうか

	parser: "typescript",
};
