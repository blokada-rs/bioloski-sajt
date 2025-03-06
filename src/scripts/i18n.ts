import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import { type CollectionEntry, type AnyEntryMap, getCollection, render } from 'astro:content';

export const langs = ["sr", "sr-lat", "en", undefined];

export async function collection<T extends "vesti" | "akcije">(
    collection: T,
    lang: string = "all"
): Promise<(CollectionEntry<T> & {lang: string})[]> {
    const c = (await getCollection(collection))
      // .filter(({data}) => !data.draft)
      .map(post => ({...post, lang: post.id.split('/')[0], id: post.id.split('/')[1]}))
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

    if (lang === "all") {
        return c;
    }
    
    return c.filter(post => lang === post.lang);
}

export async function file<C extends keyof AnyEntryMap>(
    collection: C,
    lang: string = "all"
): Promise<{
    Content: AstroComponentFactory,
    frontmatter: Record<string, any>
}> {
    const post = (await getCollection(collection))
        .map(post => ({...post, lang: post.id.split('/')[0], id: post.id.split('/')[1]}))
        .filter(post => lang === post.lang)[0];

    const rendered = await render(post);
    return {
        Content: rendered.Content,
        frontmatter: rendered.remarkPluginFrontmatter
    }
}
