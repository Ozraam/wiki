import type { PageServerLoad } from "../$types";
import { accountManager } from "$lib/repositorie/AccountManager.svelte";

export const load: PageServerLoad = async ({ cookies }) => {
    const jwt = cookies.get("jwt");
    console.log('jwt', jwt);
    if (jwt && accountManager.checkToken(jwt)) {
        return { loggedIn: true };
    } else {
        return { loggedIn: false };
    }
}