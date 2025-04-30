import { accountManager } from "$lib/repositorie/AccountManager.svelte";
import { articlesDatabase } from "$lib/repositorie/ArticleDatabase.svelte.js";
import { error, fail, redirect } from "@sveltejs/kit";

export function load({ params, cookies }) {
    const { id } = params;
    const article = articlesDatabase.getArticle(parseInt(id));

    const jwt = cookies.get("jwt");
    let decoded = null;
    if (jwt) {
        const decoded_ = accountManager.decodeToken(jwt);
        if (decoded_) {
            decoded = decoded_;
        }
    }

    // Check if the article exists in the list
    if (article === undefined) {
        error(404, "Article not found");

    }

    return {
        article: article,
        user: decoded,
    };
}

export const actions = {
    delete: async ({ request, cookies }) => {
        const formData = await request.formData();
        const id = formData.get("id")?.toString() || "";

        const jwt = cookies.get("jwt");
        let decoded = null;
        if (jwt) {
            const decoded_ = accountManager.decodeToken(jwt);
            if (decoded_) {
                decoded = decoded_;
            }
        }

        // Check if the user is logged in and has permission to delete the article
        if (!decoded) {
            error(401, 'Unauthorized');
        }

        // Check if the article ID is valid and belongs to the user
        const article = articlesDatabase.getArticle(parseInt(id));
        if (!article || article.accountId !== decoded.id) {
            error(403, 'Forbidden');
        }

        // Delete the article
        const articleId = parseInt(id);
        if (articleId) {
            articlesDatabase.deleteArticle(articleId);
        }
        // Redirect to the home page after deleting
        return redirect(303, "/");
    },
};
