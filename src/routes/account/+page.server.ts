import type { PageServerLoad } from "../$types";
import { accountManager } from "$lib/repositorie/AccountManager.svelte";

export const load: PageServerLoad = async ({ cookies }) => {
    const jwt = cookies.get('jwt');
    if (jwt) {
        const decoded = accountManager.decodeToken(jwt);
        if (decoded) {
            return { user: decoded };
        }
    }
    return { user: null };
}