import { getOgImage } from '@/components/common/ogImage/ogImage';
import type { APIContext } from 'astro';
import { getCollection, getEntry } from 'astro:content';

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
	const post = await getEntry('ogp', params.slug as string);
	const body = await getOgImage(post?.data.title as string);
	// console.log(post)
	// console.log(body)
	return new Response(body);
}
