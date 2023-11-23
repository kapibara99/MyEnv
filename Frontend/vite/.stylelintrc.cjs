module.exports = {
	extends: ['stylelint-config-standard-scss', 'stylelint-config-recess-order'],
	plugin: ['stylelint-declaration-block-no-ignored-properties'],
	rules: {
		'block-no-empty': true, // 空の宣言ブロックをチェック
		'color-no-invalid-hex': true, // 16進数表記が正しいか
		'comment-no-empty': true, // 空コメントをチェック
		'declaration-block-no-shorthand-property-overrides': true, // 宣言ブロック内でのショートハンドプロパティによる上書きをチェック
		'font-family-no-duplicate-names': true, // font-family の重複指定をチェック
		'function-calc-no-unspaced-operator': true, // calc() 内の演算子左右にスペースが入っているか
		'function-linear-gradient-no-nonstandard-direction': true, // linear-gradient の表記チェック
		'keyframe-declaration-no-important': true, // keyframes 内での !important をチェック
		'media-feature-name-no-unknown': true, // メディアクエリの指定が正しいか
		'no-duplicate-at-import-rules': true, // import 宣言に被りがないか
		'no-duplicate-selectors': true, // 重複するセレクタが無いか
		'no-empty-source': true, // 空の CSS ファイルが無いか
		'property-no-unknown': true, // 存在しないプロパティが使われていないか
		'selector-pseudo-class-no-unknown': true, // hover など、擬似クラスの名前が正しいか
		'selector-pseudo-element-no-unknown': true, // before など、擬似要素の名前が正しいか
		'selector-type-no-unknown': true, // 指定されている HTML 要素が正しいか
		'string-no-newline': true, // content 内などで文字列に改行が入っていないか
		'unit-no-unknown': true, // 単位の記述（px, em など）が正しいか
		'at-rule-no-unknown': null, // SCSS @ の記述でエラーが出るため
		'alpha-value-notation': 'number',
		'font-family-no-missing-generic-family-keyword': true,
		'declaration-block-no-shorthand-property-overrides': true,
	},
};
