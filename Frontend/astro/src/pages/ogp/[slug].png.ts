import type { APIContext } from 'astro';
import { getCollection, getEntryBySlug } from 'astro:content';
import { getOgImage } from '@/components/common/ogImage/ogImage';

export async function getStaticPaths() {
	const posts = await getCollection('ogp');
	return (
		posts?.map(post => ({
			params: { slug: post.slug },
		})) ?? []
	);
}

// OGP用のエンドポイント
export async function GET({ params }: APIContext) {
	const post = await getEntryBySlug('ogp', params.slug as string);
	const body = await getOgImage(post?.data.title as string);
	// console.log(post)
	// console.log(body)
	return new Response(body);
}
