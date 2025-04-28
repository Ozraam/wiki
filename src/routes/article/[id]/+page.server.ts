import {articlesDatabase} from '$lib/repositorie/ArticleDatabase.svelte.js';

export function load({ params }) {
    const { id } = params;
    const article = articlesDatabase.getArticle(parseInt(id));
    
    // Check if the article exists in the list
    if (article === undefined) {
        
        return {
            status: 404,
            error: new Error('Article not found'),
        };
    }
    
    return {
        article: article,
    };
}