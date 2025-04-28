import Link from 'next/link';
import styles from '../../page.module.css';

export default function Home() {
	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<p>this is test page</p>
				<Link href={'/'}>test move top</Link>
			</main>
		</div>
	);
}
