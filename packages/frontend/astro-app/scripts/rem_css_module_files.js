import fs from 'fs/promises';
import path from 'path';

async function deleteFilesRecursively(directory, filter) {
	try {
		const files = await fs.readdir(directory);

		for (const file of files) {
			const filePath = path.join(directory, file);
			const stats = await fs.lstat(filePath);

			if (stats.isDirectory()) {
				await deleteFilesRecursively(filePath, filter);

				// 空のディレクトリを削除
				try {
					await fs.rmdir(filePath);
				} catch (error) {
					// ディレクトリが空でない場合、エラーが発生する可能性がある
					console.error(`Failed to remove directory: ${filePath}`, error);
				}
			} else if (filter.test(filePath)) {
				console.log(`Deleting file: ${filePath}`);
				await fs.unlink(filePath);
			}
		}
	} catch (error) {
		console.error(`Error occurred while processing directory: ${directory}`, error);
	}
}

// 対象のディレクトリとフィルターを設定
const targetDirectory = './src';
const fileExtensionRegex = /\.module\.scss\.d\.ts(\.map)?$/;

deleteFilesRecursively(targetDirectory, fileExtensionRegex)
	.then(() => console.log('Deletion completed successfully'))
	.catch(error => console.error('An error occurred:', error));
