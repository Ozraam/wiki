import type { Actions } from './$types';
import {articlesDatabase} from '$lib/repositorie/ArticleDatabase.svelte';
import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ request }) => { 
        const formData = await request.formData();
        const title = formData.get('title')?.toString() || '';
        const content = formData.get('content')?.toString() || '';
        const description = formData.get('description')?.toString() || '';
        const date = formData.get('date')?.toString() || new Date().toISOString().split('T')[0]; // Default to today's date
        const author = formData.get('author')?.toString() || '';
        const tags = formData.get('tags')?.toString().split(',').map(tag => tag.trim()) || [];

        const newId = articlesDatabase.addArticle(content, title, description, date, author, tags);
        // Redirect to the article page after creation
        
        return redirect(303, '/article/' + newId);
    }
} satisfies Actions;