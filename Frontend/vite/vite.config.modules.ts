import fs from 'node:fs';
import path from 'path';
export const root = 'src';

/*
  このエントリーの形を自動的に作る
  input:{
    index: resolve(__dirname, './index.html'),
    hogehoge_test: resolve(__dirname, './hogehoge/test.html')
  }
*/

interface fileConfigType {
	name: string;
	path: string;
}
const files: fileConfigType[] = [];
function readDirectory(dirPath: string, targetExt: string = '.html') {
	const items = fs.readdirSync(dirPath);

	for (const item of items) {
		const itemPath = path.join(dirPath, item);
		if (fs.statSync(itemPath).isDirectory()) {
			// _modulesディレクトリを除外する (stories fileなど)
			if (item === '_modules') {
				continue;
			}
			readDirectory(itemPath);
		} else {
			// htmlファイル以外を除外する
			if (path.extname(itemPath) !== targetExt) {
				continue;
			}

			// nameを決定する
			let targetName = '';
			if (dirPath === path.resolve(__dirname, root)) {
				targetName = path.parse(itemPath).name;
			} else {
				const relativePath = path.relative(path.resolve(__dirname, root), dirPath);
				const dirName = relativePath.replace(/\//g, '_');
				targetName = `${dirName}_${path.parse(itemPath).name}`;
			}

			// pathを決定する
			const relativePath = path.relative(path.resolve(__dirname, root), itemPath);
			const filePath = `/${relativePath}`;
			// console.log("filePath", path.parse(relativePath).name, filePath);
			files.push({ name: targetName.replace('pages_', ''), path: filePath });
		}
	}
}

export const exportedInputFiles = () => {
	readDirectory(path.resolve(__dirname, root)); // add page html
	readDirectory(path.resolve(__dirname, root), '.scss'); // add entry sass
	const inputFiles: Record<string, string> = {};
	// console.log('files', files);

	for (let i = 0; i < files.length; i++) {
		const file = files[i];
		if (file === undefined) return;
		inputFiles[file.name] = path.resolve(__dirname, './' + root + file.path);
	}
	// console.log("inputFiles", inputFiles);
	return inputFiles;
};
