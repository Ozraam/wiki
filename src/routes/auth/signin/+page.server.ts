import { fail, redirect, type Actions } from "@sveltejs/kit";
import { accountManager } from "$lib/repositorie/AccountManager.svelte";

export const actions = {
    default: async ({ request, cookies }) => {
        const formData = await request.formData();
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        const remember = formData.get("remember") as string;
        const jwt = await accountManager.signIn(username, password, cookies, remember === "on");
        
        if (jwt) {
            // Set the JWT in a cookie
            cookies.set("jwt", jwt, { path: "/", httpOnly: true, secure: true, maxAge: 60 * 60 }); // 1 hour expiration
            return redirect(302, "/");
        } else {
            return fail(401, { username, incorrect: true });
        }
    }
} satisfies Actions;