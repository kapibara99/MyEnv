import { listen } from '@/_global/functions/functions';

export type LoaderStatus = 'LOADING' | 'DONE';
export interface LoaderProps {
	loaderId: string;
	status: LoaderStatus;
}

listen('loader', (e: CustomEvent<LoaderProps>) => {
	const { status } = e.detail;
	if (status === 'LOADING') {
		// fixed background
	} else {
		// remove fix background
	}
});
