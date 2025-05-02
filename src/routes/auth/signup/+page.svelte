<form method="POST" class="flex flex-col gap-4 items-center">
    <div class="flex flex-col gap-2">
        <label for="username">Username</label>
        <input
            type="username"
            id="username"
            name="username"
            required
            class="border p-2"
        />
    </div>

    <div class="flex flex-col gap-2">
        <label for="password">Password</label>
        <input
            type="password"
            id="password"
            name="password"
            required
            class="border p-2"
        />
    </div>

    <div class="flex flex-col gap-2">
        <label for="confirm-password">Confirm Password</label>
        <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            required
            class="border p-2"
        />
    </div>

    <button type="submit" class="bg-blue-500 text-white p-2 active:bg-gray-200">
        Sign Up
    </button>

    <a href="/auth/signin" class="text-blue-500 hover:underline">
        Already have an account? Sign in here.
    </a>
</form>
