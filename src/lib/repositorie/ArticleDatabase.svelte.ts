import type { Article } from "$lib/type";
import articles_base from '$lib/article/articleList.json';

class ArticleDatabase {
    private articles: { [key: string]: Article } = {};

    public addArticle(content: string, title: string, description: string, date: string, author:string, tags: string[]): number {
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
        console.log('Article added:', this.articles[id], id);
        
        return id;
    }

    public getNewId(): number {
        const ids = Object.keys(this.articles).map(Number);
        return Math.max(...ids) + 1
    }
    
    public getArticle(id: number): Article | undefined {
        if (Object.keys(this.articles).length === 0) {
            this.loadFromDatabase();
        }
        
        return this.articles[id.toString()];
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
        // localStorage.setItem('articles', JSON.stringify(this.articles));
    }

    private loadFromDatabase(): void {
        // load this.articles from localstorage
        console.log('Loading articles from localStorage...');
        
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

export const articlesDatabase = $state(new ArticleDatabase());