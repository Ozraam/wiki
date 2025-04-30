<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import SvelteMarkdown from "svelte-markdown";

    const { data } = $props();
    const { article } = data;

    let actualContent = $state("");
    let error = $state(null);

    onMount(async () => {
        if (!article?.content) {
            console.log(article);

            console.error("No content URL provided for the article.");
            return;
        }
        try {
            if (!article.content.endsWith(".md")) {
                actualContent = article.content;
                return;
            }
            const response = await fetch(article.content);
            if (!response.ok) {
                goto("/article/404", { replaceState: true });
                return;
            }
            const text = await response.text();
            actualContent = text;
        } catch (error) {
            console.error("Error fetching article content:", error);
        }
    });
</script>

<svelte:head>
    <title>{article?.title}</title>
    <meta name="description" content={article?.description} />
    <meta name="author" content={article?.author} />
    <meta name="date" content={article?.date} />
</svelte:head>

<div class="flex flex-col justify-center w-full items-center">
    <div class="max-w-3xl w-full">
        {#if data.user && data.user.id == data.article.accountId}
            <div class="w-full flex justify-end gap-2 items-center">
                <a
                    href="/create?edit=true&id={data.article.id}"
                    class="transition duration-200 hover:underline cursor-pointer text-blue-500 text-sm visited:text-blue-600 active:text-blue-700"
                >
                    Edit Article
                </a>

                <form method="POST" action="?/delete">
                    <input type="hidden" name="id" value={data.article.id} />

                    <button
                        class="transition duration-200 hover:underline cursor-pointer text-blue-500 text-sm visited:text-blue-600 active:text-blue-700"
                    >
                        Delete Article
                    </button>
                </form>
            </div>
        {/if}

        <div class="prose max-w-none w-max">
            <SvelteMarkdown source={actualContent} />
        </div>
    </div>
</div>
