import styles from './select.module.scss';

export default {
	title: 'Components/Atoms/Form',
	props: {
		label: 'text test',
	},
};

type formArgTypes = {
	label: string;
};
const Select = (props: formArgTypes) => {
	return (
		<label>
			<span>{props.label}</span>
			<select className={styles.select} name="test" id="test-select">
				<optgroup title="English">
					<option value="A">AAA</option>
					<option value="B">BBB</option>
					<option value="C">CCC</option>
				</optgroup>
				<optgroup title="Japanese">
					<option value="あ">あああ</option>
					<option value="い">いいい</option>
					<option value="う">ううう</option>
				</optgroup>
			</select>
		</label>
	);
};

export { Select };
