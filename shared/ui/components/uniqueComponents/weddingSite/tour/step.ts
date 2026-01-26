const FIRST_ALBUM_CONTENT_QUERY = '#tour-content .album-image-content:nth-of-type(1)';

export const ALBUM_TOUR_STEPS = [
	{
		selector: `${FIRST_ALBUM_CONTENT_QUERY}`,
		content: '画像をタップすると、詳細な情報を閲覧できます。タップしてみてください。',
	},
	{
		selector: `${FIRST_ALBUM_CONTENT_QUERY} .modal-content-wrapper`,
		content: '拡大画像と時期や被写体の詳細を確認できます。',
	},
	{
		selector: `${FIRST_ALBUM_CONTENT_QUERY} .modal-close`,
		content: '閉じるボタンもしくは白枠外をタップすれば、画像の一覧に戻ります。',
	},
];
