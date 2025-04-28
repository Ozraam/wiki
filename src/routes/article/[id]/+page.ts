import articles from '$lib/article/articleList.json';

export function load({ params }) {
    const { id } = params;

    // Check if the article exists in the list
    if (!articles.some((article) => article.id.toString() === id)) {
        return {
            status: 404,
            error: new Error('Article not found'),
        };
    }

    return {
        article: articles.find((article) => article.id.toString() === id),
    };
}