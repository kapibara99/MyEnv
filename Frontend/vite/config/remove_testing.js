import * as fs from 'node:fs';

const paths = ['dist/testing-page', 'dist/testing-assets'];
try {
	for (const path of paths) {
		fs.rmSync(path, { recursive: true, force: true });
	}
	console.log('remove testing resources success');
} catch (e) {
	console.log('remove testing resources error => ', e);
}
