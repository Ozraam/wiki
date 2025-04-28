import ArticleDatabase from '$lib/repositorie/ArticleDatabase.js';

export function load({ params }) {
    const { id } = params;
    const article = ArticleDatabase.getArticle(parseInt(id));
    // Check if the article exists in the list
    if (!article) {
        return {
            status: 404,
            error: new Error('Article not found'),
        };
    }

    return {
        article: article,
    };
}