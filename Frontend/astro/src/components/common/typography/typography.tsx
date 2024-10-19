import { type ReactNode } from 'react';
import styles from './typography.module.scss';
export type typographyType = { text: string };

// basic headings
export const BasicHeading1 = (props: typographyType) => <h1 className={styles.typography_h1}>{props.text}</h1>;
export const BasicHeading2 = (props: typographyType) => <h2 className={styles.typography_h2}>{props.text}</h2>;
export const BasicHeading3 = (props: typographyType) => <h3 className={styles.typography_h3}>{props.text}</h3>;
export const BasicHeading4 = (props: typographyType) => <h4 className={styles.typography_h4}>{props.text}</h4>;
export const BasicHeading5 = (props: typographyType) => <h5 className={styles.typography_h5}>{props.text}</h5>;

// basic text
export const BodyText = (props: typographyType) => <p className={styles.typography_body}>{props.text}</p>;
export const LeadText = (props: typographyType) => <p className={styles.typography_lead}>{props.text}</p>;

// count up
export const CountNum = (props: typographyType) => <p className={(styles.typography_countUpNum, styles.typography_body)}>{props.text}</p>;

// tight text box
export const TightTextBox = (props: { children: ReactNode }) => {
	return (
		<div className={styles.typography_tightBox}>
			<div className={styles.typography_tightBox__inner}>{props.children}</div>
		</div>
	);
};

// centering text box
export const CenteringTextBox = (props: { children: ReactNode }) => {
	return <div className={styles.typography_centeringBox}>{props.children}</div>;
};

// 英字大文字の時
export const EnglishUppercaseText = (props: typographyType) => <span className={styles.typography_uppercase}>{props.text}</span>;
