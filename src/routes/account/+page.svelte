<script lang="ts">
    const { data } = $props();

    let account: { username: string } | null = $state(null);
</script>

<svelte:head>
    <title>Account</title>
    <meta name="description" content="Account page." />
    <meta name="author" content="FE Wiki" />
    <meta name="date" content={new Date().toISOString()} />
</svelte:head>

<div class="flex flex-col justify-center w-full items-center">
    <h2 class="text-2xl font-semibold mb-4">Account</h2>

    <p class="text-gray-500 mb-4">
        Manage your account settings and preferences.
    </p>

    {#if data.user}
        <p class="text-green-700 mb-4">
            Welcome back, {data.user.username}! You are logged in.
        </p>

        <div class="flex gap-4 w-full justify-center">
            <a
                href="/account/settings"
                class="bg-blue-600 text-white p-2 active:bg-gray-200 hover:bg-blue-600 transition duration-200"
            >
                Account Settings
            </a>
            <a
                href="/auth/logout"
                class="ml-4 bg-red-600 text-white p-2 active:bg-gray-200 hover:bg-red-600 transition duration-200"
            >
                Log out
            </a>
        </div>
    {:else}
        <p class="text-red-600 mb-4">
            You are not logged in. Please log in to access your account.
        </p>

        <div class="flex gap-4 w-full items-center justify-center">
            <a
                href="/auth/signin"
                class="bg-blue-600 text-white p-2 active:bg-gray-200 hover:bg-blue-700 transition duration-200"
            >
                Sign in
            </a>
            <a
                href="/auth/signup"
                class="ml-4 bg-blue-600 text-white p-2 active:bg-gray-200 hover:bg-blue-700 transition duration-200"
            >
                Sign up
            </a>
        </div>
    {/if}
</div>
