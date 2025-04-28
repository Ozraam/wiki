import type { Article } from "./type";

export function getTags(articles : Article[]) {
    const tags = new Set<string>();
    articles.forEach((article) => {
        article.tags.forEach((tag) => {
            tags.add(tag);
        });
    });
    return Array.from(tags);
}