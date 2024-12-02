import { defineCollection, z } from 'astro:content';

export const collections = {
	ogp: defineCollection({
		schema: z.object({
			title: z.string(),
		}),
	}),
};
