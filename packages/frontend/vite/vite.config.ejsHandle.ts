import handlebars from 'vite-plugin-handlebars';

type pageObject = {
	[K in string]: {
		isHome: boolean;
		title?: string;
		description?: string;
	};
};
const DOMAIN_NAME = 'hogehoge side';
const PAGE_DATA: pageObject = {
	'/index.html': {
		isHome: true,
		title: 'Main Page',
	},
	'/test.html': {
		isHome: false,
		title: 'List Page',
	},
};

// https://handlebarsjs.com/guide/
export function ejsHandler() {
	return handlebars({
		context(pagePath) {
			return {
				...(PAGE_DATA[pagePath] ?? {}),
				domain: DOMAIN_NAME,
			};
		},
	}) as any;
}
