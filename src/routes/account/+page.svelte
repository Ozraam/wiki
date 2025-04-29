<script lang="ts">
    const { data } = $props();
</script>

<svelte:head>
    <title>Account</title>
    <meta name="description" content="Account page." />
    <meta name="author" content="FE Wiki" />
    <meta name="date" content={new Date().toISOString()} />
</svelte:head>

<h2 class="text-2xl font-semibold mb-4">Account</h2>

<p class="text-gray-500 mb-4">Manage your account settings and preferences.</p>

{#if data.loggedIn}{:else}
    <p class="text-red-500 mb-4">
        You are not logged in. Please log in to access your account.
    </p>

    <div class="flex gap-4 w-full">
        <a
            href="/auth/signin"
            class="bg-blue-500 text-white p-2 active:bg-gray-200 hover:bg-blue-600 transition duration-200"
        >
            Sign in
        </a>
        <a
            href="/auth/signup"
            class="ml-4 bg-blue-500 text-white p-2 active:bg-gray-200 hover:bg-blue-600 transition duration-200"
        >
            Sign up
        </a>
    </div>
{/if}
