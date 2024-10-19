import { useCallback, useEffect, useRef, useState } from 'react';
import { LocalFontFamilies } from '../fontfamily/fontfamily';
import {
	BasicHeading1,
	BasicHeading2,
	BasicHeading3,
	BasicHeading4,
	BasicHeading5,
	BodyText,
	CenteringTextBox,
	CountNum,
	EnglishUppercaseText,
	LeadText,
	TightTextBox,
	type typographyType,
} from './typography';

export default {
	title: 'Components/Atoms/Typography',
	// component: BasicHeading1,
	tags: ['autodocs'],
	args: {
		text: 'text test',
	},
};

export const Heading1 = BasicHeading1;
export const Heading2 = BasicHeading2;
export const Heading3 = BasicHeading3;
export const Heading4 = BasicHeading4;
export const Heading5 = BasicHeading5;
export const text = BodyText;
export const lead = LeadText;

export const longText = (args: typographyType) => {
	let i = 0;
	let numText = '';
	while (i < 100) {
		numText += String(i % 10);
		i++;
	}
	return <BodyText text={args.text + numText} />;
};

export const uppercase = EnglishUppercaseText;

export const tightBox = () => {
	return (
		<TightTextBox>
			<p>このあのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。</p>
		</TightTextBox>
	);
};

export const centeringBox = (args: typographyType) => {
	let { text } = args;
	for (var i = 0; i < 10; i++) {
		text += args.text;
	}
	return (
		<>
			<p>一行なら中央揃え</p>
			<div
				style={{
					outline: '1px solid #000',
					padding: '3px 5px',
					maxWidth: '500px',
					width: '50%',
				}}>
				<CenteringTextBox>
					<p>{args.text}</p>
				</CenteringTextBox>
			</div>
			<hr style={{ margin: '15px 5px' }} />
			<p>複数行なら左揃え</p>
			<div
				style={{
					outline: '1px solid #000',
					padding: '3px 5px',
					maxWidth: '500px',
					width: '50%',
				}}>
				<CenteringTextBox>
					<p>{text}</p>
				</CenteringTextBox>
			</div>
		</>
	);
};

const useAnimationFrame = (isRunning: boolean, callback = () => {}) => {
	const reqIdRef = useRef<number>();
	const loop = useCallback(() => {
		if (isRunning) {
			// isRunning が true の時だけループ
			reqIdRef.current = requestAnimationFrame(loop);
			callback();
		} else {
			reqIdRef.current = 0;
			return () => cancelAnimationFrame(reqIdRef.current as number);
		}
		// isRunning も依存配列に追加
	}, [isRunning, callback]);

	useEffect(() => {
		reqIdRef.current = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(reqIdRef.current as number);
	}, [loop]);
};
export const countUpNum = () => {
	const [count, setCounter] = useState(0);
	const [isRunning, setIsRunning] = useState(false);

	// setCounter するたびに関数を再生成するのを防ぐ
	const countUp = useCallback(() => {
		setCounter(prevCount => ++prevCount);
	}, []);
	useAnimationFrame(isRunning, countUp);

	return (
		<div>
			<CountNum text={`現在のカウント: ${count} dayo!!`} />
			<button onClick={() => setIsRunning(true)}>開始</button>
			<button onClick={() => setIsRunning(false)}>停止</button>
			<button onClick={() => setCounter(0)}>初期化</button>
		</div>
	);
};

export const NotoFont = (args: typographyType) => {
	return (
		<>
			<LocalFontFamilies />
			<div style={{ fontFamily: 'Noto Sans JP' }}>
				<BodyText text={args.text} />
			</div>
		</>
	);
};

export const BIZUDGothicFont = (args: typographyType) => {
	return (
		<>
			<LocalFontFamilies />
			<div style={{ fontFamily: 'BIZ UDGothic' }}>
				<BodyText text={args.text} />
			</div>
		</>
	);
};
