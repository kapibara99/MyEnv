import fs from 'fs';
import glob from 'glob';
import postcss from 'postcss';
import comments from 'postcss-discard-comments';

function editCSS(cssFilePath) {
	// ファイルを読み込む
	const css = fs.readFileSync(cssFilePath, 'utf8');
	const newCss = postcss(comments({ removeAll: true })).process(css).css;
	// ファイルを書き換え
	fs.writeFileSync(cssFilePath, newCss);
	console.log('処理終了:', cssFilePath);
}

// distフォルダ以下の全てのCSSファイルのパスを取得
glob('dist/**/*.css', (err, files) => {
	if (err) {
		console.error(err);
	} else {
		console.log('処理開始:removeCommentsInCSSFiles', '処理対象一覧:', files); // 取得したファイルパスの一覧
		// 各ファイルに対して処理を行う
		files.forEach(file => {
			try {
				console.log('処理開始:', file);
				editCSS(file);
			} catch (error) {
				console.error(error);
			}
		});
	}
	console.log('処理完了:removeCommentsInCSSFiles', '\n\n');
});
