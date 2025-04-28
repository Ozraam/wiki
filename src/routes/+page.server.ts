import {articlesDatabase} from '$lib/repositorie/ArticleDatabase.svelte.js';

export function load() {
    
    return {
        articles: articlesDatabase.getAllArticles(),
    };
}