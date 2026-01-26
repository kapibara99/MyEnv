import { GiForkKnifeSpoon } from 'react-icons/gi';
import { GrScheduleNew } from 'react-icons/gr';
import { HiOutlinePhoto } from 'react-icons/hi2';
import { RiHome2Line } from 'react-icons/ri';
import { RiCheckboxMultipleBlankLine } from 'react-icons/ri';

export type iconNameType = 'home' | 'dinner' | 'guide' | 'album' | 'blank' | '';
type IconProps = {
	iconName: iconNameType;
	ownClassName?: string;
};

const iconMap: Record<iconNameType, React.ReactNode> = {
	home: <RiHome2Line />,
	dinner: <GiForkKnifeSpoon />,
	guide: <GrScheduleNew />,
	album: <HiOutlinePhoto />,
	blank: <RiCheckboxMultipleBlankLine />,
	'': null,
};

export default function Icon({ iconName, ownClassName }: IconProps) {
	const chooseIcon = iconMap[iconName];
	if (!chooseIcon) return <></>;

	return (
		<span className={'unique-icon' + ' ' + (ownClassName ? ownClassName : 'size-5 block m-auto')} data-icon-name={iconName}>
			{chooseIcon}
		</span>
	);
}
