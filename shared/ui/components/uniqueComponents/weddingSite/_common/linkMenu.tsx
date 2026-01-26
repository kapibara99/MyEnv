import { NavLink, useLocation } from 'react-router-dom';
import type { iconNameType } from './icon';
import Icon from './icon';

type menuLink = {
	name: string;
	href: string;
	iconName: iconNameType;
};

const links: menuLink[] = [
	{
		name: 'HOME',
		href: '',
		iconName: 'home',
	},
	{
		name: 'しおり',
		href: 'guide',
		iconName: 'guide',
	},
	{
		name: '会食',
		href: 'dinner',
		iconName: 'dinner',
	},
	{
		name: 'アルバム',
		href: 'album',
		iconName: 'album',
	},
];
export function LinkMenu() {
	// 共通footer側リンクメニュー
	const { pathname } = useLocation();
	function linkPageStyle(targetPath: string) {
		const linkBaseStyle = 'block text-center p-3 relative hover:opacity-80';
		if (targetPath == pathname) {
			return linkBaseStyle + ' bg-primary-2';
		}
		return linkBaseStyle + ' ';
	}
	return (
		<div className="unique-floating-menu fixed max-sm:bottom-0 sm:bottom-10 left-1/2 transform -translate-x-1/2 z-11 border border-base-line sm:rounded-2xl overflow-hidden bg-base-bg-color w-full sm:max-w-[500px]">
			<div className="flex max-sm:text-sm justify-between">
				{links.map(link => (
					<div key={link.href} className="w-1/4 h-full">
						<NavLink className={linkPageStyle('/' + link.href)} to={'/' + link.href}>
							<Icon iconName={link.iconName} />
							{link.name}
						</NavLink>
					</div>
				))}
			</div>
		</div>
	);
}
