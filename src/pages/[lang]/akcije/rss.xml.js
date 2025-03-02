import rss from '@astrojs/rss';
import { SITE_TITLE, SITE_DESCRIPTION } from '../../../consts';
import { collection, langs } from "@scripts/i18n"

export async function getStaticPaths() {
	return langs.map(lang => ({params: {lang}}));
}

export async function GET({params, site}) {
	const posts = await collection('akcije', params.lang);
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site,
		items: posts.map((post) => ({
			...post.data,
			link: `/${post.lang}/akcije/${post.id}/`,
		})),
	});
}
