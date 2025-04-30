import { JWT_REFRESH_TOKEN, JWT_TOKEN } from "$env/static/private";
import type { Cookies } from "@sveltejs/kit";
import { sign, verify } from "jsonwebtoken";

class Account {
    toJson(): string {
        return JSON.stringify({
            username: this.username,
        });
    }
    id: number;
    username: string;
    password: string;

    constructor(id: number, username: string, password: string) {
        this.id = id;
        this.username = username;
        this.password = password;
    }
}

class AccountManager {
    
    private static instance: AccountManager | null = null;
    private accounts: { [key: string]: Account } = {};

    private constructor() {
        this.loadFromDatabase();
    }
    public static getInstance(): AccountManager {
        if (this.instance === null) {
            this.instance = new AccountManager();
        }
        return this.instance;
    }
    public async addAccount(username: string, password: string): Promise<number> {
        if (this.getAccountByUsername(username)) {
            console.log('Account already exists:', username);
            return -1; // Account already exists
        }
        const id = this.getNewId();
        this.accounts[id] = new Account(id, username, await Bun.password.hash(password));
   
        this.saveToDatabase();
        
        return id;
    }

    public getNewId(): number {
        if (Object.keys(this.accounts).length === 0) {
            return 0; // Start from 0 if no accounts exist
        }
        const ids = Object.keys(this.accounts).map(Number);
        return Math.max(...ids) + 1
    }

    public getAccount(id: number): Account | undefined {
        if (Object.keys(this.accounts).length === 0) {
            this.loadFromDatabase();
        }
        
        return this.accounts[id.toString()];
    }

    public deleteAccount(id: number): void {
        delete this.accounts[id];
        this.saveToDatabase();
    }

    public getAllAccounts(): Account[] {
        if (Object.keys(this.accounts).length === 0) {
            this.loadFromDatabase();
        }
        return Object.values(this.accounts);
    }

    private saveToDatabase(): void {
        // save this.accounts to localstorage
        // localStorage.setItem('accounts', JSON.stringify(this.accounts));
    }

    private loadFromDatabase(): void {
        // load this.accounts from localstorage
        // const accounts = localStorage.getItem('accounts');
        // if (accounts) {
        //     this.accounts = JSON.parse(accounts);
        // }
    }

    public getAccountByUsername(username: string): Account | undefined {
        return Object.values(this.accounts).find(account => account.username === username);
    }

    public async signIn(username: string, password: string, cookies: Cookies, setRefreshToken: boolean): Promise<string> {
        const account = this.getAccountByUsername(username);
        if (account && await Bun.password.verify(password, account.password)) {
            const jwt = this.getJWTToken(account);
            if (setRefreshToken) {
                const refreshToken = this.getRefreshJWT(account);
                // Set the refresh token in a cookie
                cookies.set("refreshToken", refreshToken, { path: "/", httpOnly: true, secure: true, maxAge: 60 * 60 * 24 * 30 }); // 30 days expiration
            }
            // Set the JWT in a cookie
            cookies.set("jwt", jwt, { path: "/", httpOnly: true, secure: true, maxAge: 60 * 60 }); // 1 hour expiration
            return jwt;
        } else {
            return '';
        }
    }

    private getJWTToken(account: Account): string {
        const jwt = sign({ id: account.id, username: account.username }, JWT_TOKEN, { expiresIn: '1h' });
        return jwt;
    }

    public checkToken(token: string, cookies: Cookies): boolean {
        try {
            const decoded = verify(token, JWT_TOKEN) as { id: number; username: string };
            const account = this.getAccount(decoded.id);
            if (account && account.username === decoded.username) {
                return true;
            }
        } catch (error) {
            console.error('Token verification failed:', error);
            // Check if the token is expired and refresh it if possible
            const refreshToken = cookies.get("refreshToken");
            if (refreshToken) {
                const newJwt = this.getSigninByRefreshToken(refreshToken, cookies);
                if (newJwt) {
                    return true; // Token refreshed successfully
                }
            }
            console.error('Token is invalid or expired:', error);
            cookies.delete("jwt", { path: "/" });
            cookies.delete("refreshToken", { path: "/" });
        }
        return false;
    }

    decodeToken(jwt: string, cookies: Cookies) : { id: number; username: string } | undefined {
        try {
            const decoded = verify(jwt, JWT_TOKEN) as { id: number; username: string };
            const account = this.getAccount(decoded.id);
            if (account && account.username === decoded.username) {
                return decoded;
            }
            return undefined;
        } catch (error) {
            console.error('Token verification failed:', error);
            // Check if the token is expired and refresh it if possible
            const refreshToken = cookies.get("refreshToken");
            if (refreshToken) {
                const newJwt = this.getSigninByRefreshToken(refreshToken, cookies);
                if (newJwt) {
                    return this.decodeToken(newJwt, cookies); // Decode the new token
                }
            }
            console.error('Token is invalid or expired:', error);
            return undefined;
        }
    }

    public getRefreshJWT(acc: Account): string {
        const jwt = sign({ id: acc.id, username: acc.username }, JWT_REFRESH_TOKEN, { expiresIn: '30d' });
        return jwt;
    }

    public getSigninByRefreshToken(token: string, cookies: Cookies): string | undefined {
        try {
            const decoded = verify(token, JWT_REFRESH_TOKEN) as { id: number; username: string };
            const account = this.getAccount(decoded.id);
            if (account && account.username === decoded.username) {
                const jwt = this.getJWTToken(account);
                // Set the JWT in a cookie
                cookies.set("jwt", jwt, { path: "/", httpOnly: true, secure: true, maxAge: 60 * 60 }); // 1 hour expiration
                // Set the refresh token in a cookie
                const refreshToken = this.getRefreshJWT(account);
                cookies.set("refreshToken", refreshToken, { path: "/", httpOnly: true, secure: true, maxAge: 60 * 60 * 24 * 30 }); // 30 days expiration
                return jwt;
            }
        } catch (error) {
            console.error('Token verification failed:', error);
        }
        return undefined;
    }

}

export const accountManager = AccountManager.getInstance();
export type { Account };