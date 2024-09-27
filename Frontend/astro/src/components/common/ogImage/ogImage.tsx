import { Buffer } from 'buffer';
import satori from 'satori';
import sharp from 'sharp';
// if (!window.Buffer) window.Buffer = Buffer;

export async function getOgImage(text: string) {
	const fontData = (await getFontData()) as ArrayBuffer;
	const svg = await satori(
		<main
			style={{
				height: '100%',
				width: '100%',
				position: 'relative',
				backgroundColor: '#444',
				color: '#fff',
				padding: '10px',
			}}>
			<h1
				style={{
					fontSize: '60px',
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
				}}>
				{text}
			</h1>
		</main>,
		{
			width: 1200,
			height: 630,
			fonts: [
				{
					name: 'Noto Sans JP',
					data: fontData,
					style: 'normal',
				},
			],
		},
	);

	return await sharp(Buffer.from(svg)).png().toBuffer();
}

async function getFontData() {
	const API = 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700';

	const css = await (
		await fetch(API, {
			headers: {
				// Make sure it returns TTF.
				'User-Agent': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
			},
		})
	).text();

	const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

	if (!resource) return;

	return await fetch(resource[1]).then(res => res.arrayBuffer());
}
