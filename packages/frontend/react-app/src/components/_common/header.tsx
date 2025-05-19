import { NavLink } from 'react-router-dom';

export default function Header() {
	return (
		<header className="text-center p-4 shadow-md">
			<h1 className="text-3xl font-bold text-base-strong">
				<NavLink to="/">HEADER</NavLink>
			</h1>
		</header>
	);
}
