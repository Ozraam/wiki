import type { PageServerLoad } from "../$types";
import { accountManager } from "$lib/repositorie/AccountManager.svelte";

export const load: PageServerLoad = async ({ cookies }) => {
    const jwt = cookies.get("jwt");
    console.log('jwt', jwt);
    if (jwt && accountManager.checkToken(jwt)) {
        const decoded = accountManager.decodeToken(jwt);
        if (!decoded) {
            console.log('Token decoding failed');
            return { loggedIn: false };
        }
        const account = accountManager.getAccount(decoded.id);
        if (account) {
            return { loggedIn: true, account : account.toJson() };
        }
        console.log('Account not found for ID:', decoded.id);
        return { loggedIn: false };
        
    } else {
        return { loggedIn: false };
    }
}