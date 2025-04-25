<script lang="ts">
    import articles from '$lib/article/articleList.json';
  import ArticleCard from '$lib/components/home/ArticleCard.svelte';
</script>

<main class="p-4">
    <h2 class="text-2xl font-bold mb-4">
        Article List
    </h2>

    <ul class="flex flex-col gap-4">
        {#if articles.length === 0}
            <li class="text-gray-500">No articles available.</li>
        {:else}
            <li class="text-gray-500">Total: {articles.length} articles</li>
        {/if}
        {#each articles as article}
            <li>
                <ArticleCard article={article} />
            </li>
        {/each}
    </ul>
</main>

