<form method="POST" class="flex flex-col gap-4 items-center">
    <label for="username">Username</label>
    <input type="username" id="username" name="username" required class="border p-2" />

    <label for="password">Password</label>
    <input type="password" id="password" name="password" required class="border p-2" />

    <label for="remember" class="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" id="remember" name="remember" class="cursor-pointer" />
        Remember me
    </label>

    <button type="submit" class="bg-blue-500 text-white p-2 active:bg-gray-200">Sign In</button>
    <a href="/auth/signup" class="text-blue-500 hover:underline">
        No account? Sign up here.
    </a>
</form>