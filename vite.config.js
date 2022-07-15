import { resolve } from 'path';

import vercel from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';
import preprocess from 'svelte-preprocess';

/** @type {import('vite').UserConfig} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	plugins: [sveltekit()],
	preprocess: preprocess(),
	kit: {
		adapter: vercel(),
		vite: {
			resolve: {
				alias: {
					'@components': resolve('src/components'),
					'@modules': resolve('src/modules'),
					'@routes': resolve('src/routes'),
					'@home': resolve('src/'),
					'@graphql': resolve('src/gql')
				}
			}
		}
	}
};

export default config;
