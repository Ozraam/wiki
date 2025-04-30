import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
    // Clear the JWT cookie to log out the user
    cookies.delete('jwt', { path: '/' });
    // Clear the refresh token cookie if you have one
    cookies.delete('refreshToken', { path: '/' });
    
    // Optionally, you can redirect the user to the login page or home page after logout
    return redirect(302, '/');
}