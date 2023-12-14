import { listen } from '@/_global/functions/functions';

export type LoaderStatus = 'LOADING' | 'DONE';
listen('loader', (e: CustomEvent<{ loaderId: string; status: LoaderStatus }>) => {
	const { loaderId, status } = e.detail;
	if (status === 'LOADING') {
		// fixed background
	} else {
		// remove fix background
	}
});
