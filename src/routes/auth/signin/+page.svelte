<form method="POST" class="flex flex-col gap-4">
    <label for="username">Username</label>
    <input type="username" id="username" name="username" required class="border p-2" />

    <label for="password">Password</label>
    <input type="password" id="password" name="password" required class="border p-2" />

    <button type="submit" class="bg-blue-500 text-white p-2 active:bg-gray-200">Sign In</button>
    <a href="/auth/signup">
        No account? Sign up here.
    </a>
</form>