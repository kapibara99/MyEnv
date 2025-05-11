import { useEffect, useState } from 'react';

export default function AdmaxContent({ admaxID }: { admaxID: string }) {
	const [dev] = useState(import.meta.env.DEV);
	console.log('admaxID',admaxID,dev);

	useEffect(() => {
		if (dev) return;
		const script = document.createElement('script');
		script.src = 'https://adm.shinobi.jp/st/t.js';
		script.async = true;
		document.body.appendChild(script);
		window.admaxads = window.admaxads || [];
		window.admaxads.push({ admax_id: admaxID, type: 'switch' });
		return () => {
			document.body.removeChild(script);
		};
	}, [admaxID, dev]);

	return (
		<>
			<div className="mt-8 flex justify-center">
				{dev ? <img className="inline-block" src="https://placehold.jp/728x90.png" alt="AD dummy" /> : <div className={`admax-switch inline-block`} data-admax-id={admaxID} />}
			</div>
		</>
	);
}
