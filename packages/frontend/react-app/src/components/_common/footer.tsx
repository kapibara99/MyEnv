import { NavLink } from 'react-router';

export default function Footer() {
	return (
		<footer className="w-full text-center mt-30 py-10">
			<div className="flex justify-center gap-5 mb-2">
				<a className="underline hover:text-attention" href="" target="_blank" rel="noopener">
					お問い合わせ
				</a>
				<NavLink className="underline hover:text-attention" to="kiyaku">
					利用規約
				</NavLink>
				<NavLink className="underline hover:text-attention" to="privacy">
					プライバシーポリシー
				</NavLink>
			</div>

			<p>Copyright &copy; {`${new Date().getFullYear()}`} kapy</p>
		</footer>
	);
}
