import styles from './textInput.module.scss';
type formArgTypes = {
	label: string;
};

export const Input = (props: formArgTypes) => {
	return (
		<label className={styles.input}>
			<input type="text" name="test" id="test-input" />
			<span>{props.label}</span>
		</label>
	);
};
