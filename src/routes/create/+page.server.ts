import type { Actions } from './$types';
import {articlesDatabase} from '$lib/repositorie/ArticleDatabase.svelte';
import { redirect } from '@sveltejs/kit';
import { accountManager } from '$lib/repositorie/AccountManager.svelte';

export function load({ cookies, url }) {
    const jwt = cookies.get('jwt');
    let is_edit = url.searchParams.get('edit') === 'true';
    const articleId = url.searchParams.get('id') || null;
    let article = null;

    

    if (jwt) {
        const decoded = accountManager.decodeToken(jwt, cookies);
        if (is_edit && articleId) {
            const temp = articlesDatabase.getArticle(parseInt(articleId));
            if (temp && decoded && temp.accountId === decoded.id) {
                article = temp;
            } else {
                is_edit = false; // Reset is_edit if the article doesn't belong to the user
            }
        }
        if (decoded) {
            return { user: decoded, article, is_edit };
        }
    }
    return { user: null };
}

export const actions = {
    default: async ({ request, cookies, url }) => { 
        const formData = await request.formData();
        const title = formData.get('title')?.toString() || '';
        const content = formData.get('content')?.toString() || '';
        const description = formData.get('description')?.toString() || '';
        const date = formData.get('date')?.toString() || new Date().toISOString().split('T')[0]; // Default to today's date
        const author = formData.get('author')?.toString() || '';
        const tags = formData.get('tags')?.toString().split(',').map(tag => tag.trim()) || [];

        const jwt = cookies.get('jwt');
        let accountId = -1;
        if (jwt) {
            const decoded = accountManager.decodeToken(jwt, cookies);
            if (decoded) {
                accountId = decoded.id;
            }
        }

        const is_edit = url.searchParams.get('edit') === 'true';
        const articleId = url.searchParams.get('id') || null;
        console.log(url.searchParams);
        
        if (is_edit && articleId) {
            // Edit the article
            const id = parseInt(articleId);
            articlesDatabase.editArticle(id, content, title, description, date, author, tags, accountId);
            // Redirect to the article page after editing
            return redirect(303, '/article/' + articleId);
        }

        const newId = articlesDatabase.addArticle(content, title, description, date, author, tags, accountId);
        // Redirect to the article page after creation
        
        return redirect(303, '/article/' + newId);
    }
} satisfies Actions;