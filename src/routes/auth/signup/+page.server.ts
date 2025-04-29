import { fail, redirect, type Actions } from "@sveltejs/kit";
import { accountManager } from "$lib/repositorie/AccountManager.svelte";

export const actions = {
    default: async ({ request, cookies }) => {
        const formData = await request.formData();
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        const confirmPassword = formData.get("confirm-password") as string;

        if (password !== confirmPassword) {
            return fail(400, { username, passwordMismatch: true });
        }
        
        const id = await accountManager.addAccount(username, password);
        
        if (id != -1) {
            return redirect(302, '/auth/signin');
        } else {
            return fail(401, { username, usernameExists: true });
        }
    }
} satisfies Actions;