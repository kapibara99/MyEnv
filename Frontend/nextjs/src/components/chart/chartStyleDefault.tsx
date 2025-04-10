import { useAtom } from 'jotai';
import { chartStyleAtom } from '../../service/chart-style-edit/chartStyle.atoms';

export default function ChartStyleDefault({ children }: { children: React.ReactNode }) {
	const [style] = useAtom(chartStyleAtom);
	return <div className={style.classValue}>{children}</div>;
}
