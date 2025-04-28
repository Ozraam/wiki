<script lang="ts">
    import ArticleCard from "$lib/components/home/ArticleCard.svelte";
    import {articlesDatabase} from "$lib/repositorie/ArticleDatabase.svelte";
    import type { Article } from "$lib/type";
    import { onMount } from "svelte";

    const { data } = $props();

    let articles: Article[] = data.articles || [];

</script>

<svelte:head>
    <title>FE Wiki</title>
    <meta
        name="description"
        content="A collection of articles about France Elevateur."
    />
</svelte:head>

<main>
    <h2 class="text-2xl font-bold mb-4">Article List</h2>

    <ul class="flex flex-col gap-4">
        {#if articles.length === 0}
            <li class="text-gray-500">No articles available.</li>
        {:else}
            <li class="text-gray-500">Total: {articles.length} articles</li>
        {/if}
        {#each articles as article}
            <li>
                <ArticleCard {article} />
            </li>
        {/each}
    </ul>
</main>
