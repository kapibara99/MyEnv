import styles from './typography.module.scss';
type typographyType = { text: string };

const BasicHeading1 = (props: typographyType) => <h1 className={(styles.typography, styles.typography_h1)}>{props.text}</h1>;
const BasicHeading2 = (props: typographyType) => <h2 className={(styles.typography, styles.typography_h2)}>{props.text}</h2>;
const BasicHeading3 = (props: typographyType) => <h3 className={(styles.typography, styles.typography_h3)}>{props.text}</h3>;
const BasicHeading4 = (props: typographyType) => <h4 className={(styles.typography, styles.typography_h4)}>{props.text}</h4>;
const BasicHeading5 = (props: typographyType) => <h5 className={(styles.typography, styles.typography_h5)}>{props.text}</h5>;

const bodyText = (props: typographyType) => <p className={(styles.typography, styles.typography_body)}>{props.text}</p>;
const leadText = (props: typographyType) => <p className={(styles.typography, styles.typography_lead)}>{props.text}</p>;

// count up

export { BasicHeading1, BasicHeading2, BasicHeading3, BasicHeading4, BasicHeading5, bodyText, leadText };
