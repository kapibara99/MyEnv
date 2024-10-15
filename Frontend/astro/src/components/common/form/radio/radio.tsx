import { useState } from 'react';
import styles from './radio.module.scss';

type formArgTypes = {
	label: string;
	index: number;
	name: string;
	checked?: boolean;
};
export const RadioButton = (props: formArgTypes) => {
	const id = `${props.name}-${props.index}`;
	const [checked, setChecked] = useState(props.checked || false);
	const onchange = () => {
		setChecked(!checked);
	};
	return (
		<label className={styles.radio_button} htmlFor={id}>
			<input type="radio" name={props.name} id={id} checked={checked} onChange={onchange} />
			<span>{props.label}</span>
		</label>
	);
};
