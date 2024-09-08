import fs from 'fs';
import glob from 'glob';
import { load } from 'cheerio';

function rearrangeCSS(htmlFilePath, newOrder) {
	// HTMLファイルを読み込む
	const html = fs.readFileSync(htmlFilePath, 'utf8');

	// cheerioでHTMLをパース
	const $ = load(html);

	// linkタグを配列で取得
	const links = $('link[rel="stylesheet"]');
	const newOrderCssFiles = [];

	// まず、指定のcssを配列に格納する
	for (let i = 0; i < newOrder.length; i++) {
		const filename = newOrder[i];
		const newOrderLink = links.filter((_, el) => $(el).attr('href').includes(filename)).attr('href');
		if (newOrderLink) newOrderCssFiles.push(newOrderLink);
	}

	// 指定のなかったcssを元の順で配列末尾に格納する
	for (let i = 0; i < links.length; i++) {
		if (!newOrderCssFiles.includes(links.eq(i).attr('href'))) {
			newOrderCssFiles.push(links.eq(i).attr('href'));
		}
	}

	// linkタグを更新
	for (let i = 0; i < links.length; i++) {
		$(links[i]).attr('href', newOrderCssFiles[i]);
	}

	// HTMLファイルを書き換え
	fs.writeFileSync(htmlFilePath, $.html());
	console.log('処理終了:', htmlFilePath);
}

const newOrder = ['base.css', 'style.css']; // 新しい順序 存在しないファイル名の場合は、スキップされる
// distフォルダ以下の全てのHTMLファイルのパスを取得
glob('dist/**/*.html', (err, files) => {
	if (err) {
		console.error(err);
	} else {
		console.log('処理対象一覧:', files); // 取得したファイルパスの一覧
		// 各ファイルに対して処理を行う
		files.forEach(file => {
			try {
				console.log('処理開始:', file);
				rearrangeCSS(file, newOrder);
			} catch (error) {
				console.error(error);
			}
		});
	}
});
