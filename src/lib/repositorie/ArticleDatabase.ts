import type { Article } from "$lib/type";
import articles_base from '$lib/article/articleList.json';

class ArticleDatabase {
    private articles: { [key: number]: Article } = {};

    public addArticle(content: string, title: string, description: string, date: string, author:string, tags: string[]): void {
        const id = this.getNewId();
        this.articles[id] = {
            id: id,
            content,
            title,
            description,
            date,
            author,
            tags
        };
        this.saveToDatabase();
    }

    public getNewId(): number {
        const ids = Object.keys(this.articles).map(Number);
        return Math.max(...ids) + 1
    }
    
    public getArticle(id: number): Article | undefined {
        if (Object.keys(this.articles).length === 0) {
            this.loadFromDatabase();
        }
        return this.articles[id];
    }
    
    public deleteArticle(id: number): void {
        delete this.articles[id];
    }

    public getAllArticles(): Article[] {
        if (Object.keys(this.articles).length === 0) {
            this.loadFromDatabase();
        }
        return Object.values(this.articles);
    }

    private saveToDatabase(): void {
        // save this.articles to localstorage
        localStorage.setItem('articles', JSON.stringify(this.articles));
    }

    private loadFromDatabase(): void {
        // load this.articles from localstorage
        
        const articles = isLocalStorageAvailable() ? localStorage.getItem('articles') : null;
        if (articles) {
            this.articles = JSON.parse(articles);
        } else {
            this.articles = {};
            articles_base.forEach((article: Article) => {
                this.articles[article.id] = article;
            });
        }
    }
}
function isLocalStorageAvailable() {
    try {
        const testKey = 'test';
        localStorage.setItem(testKey, 'testValue');
        localStorage.removeItem(testKey);
        return true;
    } catch (e) {
        return false;
    }
}

export default new ArticleDatabase();