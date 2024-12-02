import { Checkbox } from './checkbox/checkbox';
import { Input } from './input/input';
import { RadioButton } from './radio/radio';
import { Select } from './select/select';
export default {
	title: 'Components/Atoms/Form',
	tags: ['autodocs'],
	args: {
		label: 'text test',
	},
};
export const BasicCheckbox = Checkbox;
export const TextInput = Input;
export const BaseSelect = Select;
export const MultiRadio = (args: { label: string }) => {
	return (
		<>
			<RadioButton label={args.label} index={11} name="test" checked={true} />
			<RadioButton label={args.label} index={12} name="test" checked={false} />
			<RadioButton label={args.label} index={13} name="test" checked={false} />
		</>
	);
};
