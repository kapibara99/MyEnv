import styles from './checkbox.module.scss';

type formArgTypes = {
	label: string;
};
export const Checkbox = (props: formArgTypes) => {
	return (
		<label className={styles.checkbox}>
			<input type="checkbox" name="test" id="test-checkbox" />
			<span>{props.label}</span>
		</label>
	);
};
