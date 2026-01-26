import { NavLink, useLocation } from 'react-router-dom';

export default function Header() {
	const { pathname } = useLocation();
	function linkPageStyle(targetPath: string) {
		const linkBaseStyle = 'block text-center p-3 relative hover:opacity-80 before:absolute before:left-0 before:top-1/4 before:w-[1px] before:h-1/2 before:bg-base-line';
		if (targetPath == pathname) {
			return linkBaseStyle + ' underline';
		}
		return linkBaseStyle + '';
	}

	return (
		<>
			<header className="p-4">
				<h1 className="font-bold">
					<NavLink to="/">2025/9/27.28 Wedding Ceremony</NavLink>
				</h1>
			</header>
			<div className="mt-2 overflow-x-scroll">
				<nav className="min-w-[375px] flex border-y border-base-font-color">
					<NavLink className={linkPageStyle('/')} to={'/'}>
						HOME
					</NavLink>
					<NavLink className={linkPageStyle('/guide')} to={'/guide'}>
						しおり
					</NavLink>
					<NavLink className={linkPageStyle('/dinner')} to={'/dinner'}>
						会食
					</NavLink>
					<NavLink className={linkPageStyle('/album')} to={'/album'}>
						アルバム
					</NavLink>
				</nav>
			</div>
		</>
	);
}
