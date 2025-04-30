<script lang="ts">
    import "iconify-icon";
    import { articlesDatabase } from "$lib/repositorie/ArticleDatabase.svelte";
    import ArticleCard from "$lib/components/home/ArticleCard.svelte";
    import { getTags } from "$lib/utils";
    import { onMount } from "svelte";
    import type { Article } from "$lib/type";

    const { data } = $props();

    const articles: Article[] = data.articles || [];
    let searchQuery = $state("");

    let filteredArticles = $derived(
        articles.filter(
            (article) =>
                article.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                article.description
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
        )
    );
    let tagPanelOpen = $state(false);
    let tags: { tag: string; checked: boolean }[] = $state(
        getTags(articles).map((tag) => ({ tag: tag, checked: true }))
    );

    let selectedTags = $derived(
        tags.filter((tag) => tag.checked).map((tag) => tag.tag)
    );

    let tagFilteredArticles = $derived(
        filteredArticles.filter((article) =>
            article.tags.some((tag) => selectedTags.includes(tag))
        )
    );

    function clearTags() {
        tags = tags.map((tag) => ({ ...tag, checked: false }));
    }

    function allTags() {
        tags = tags.map((tag) => ({ ...tag, checked: true }));
    }

    function toogleTagPanel() {
        tagPanelOpen = !tagPanelOpen;
    }
</script>

<svelte:head>
    <title>Search</title>
    <meta
        name="description"
        content="Search for articles about France Elevateur."
    />
</svelte:head>

<main>
    <h2 class="text-2xl font-bold mb-4">Article List</h2>
    <div class="lg:grid lg:grid-cols-[1fr_3fr] lg:gap-4 lg:items-start">
        <div class="lg:p-4 lg:sticky lg:top-4 lg:bg-white lg:shadow-lg lg:rounded-lg lg:max-h-[calc(100vh-4rem)] lg:overflow-auto">
            <div>
                <label for="seatch">
                    <iconify-icon icon="oui:ws-search"></iconify-icon>
                    <span class="text-gray-700">Search</span>
                </label>
                <input
                    id="search"
                    type="text"
                    bind:value={searchQuery}
                    placeholder="Article title or description"
                    class="border border-gray-300 rounded-lg p-2 mb-4 w-full"
                />
            </div>

            <button
                onclick={toogleTagPanel}
                class="mb-4 flex items-center gap-2 cursor-pointer active:bg-gray-200 px-1 lg:hidden"
            >
                Tag Filter
            </button>

            <aside
                class="flex flex-col gap-1 bg-white fixed h-full w-full transition-transform top-0 left-0 z-20 p-4 duration-500 {tagPanelOpen
                    ? 'translate-x-0'
                    : 'translate-x-full'} lg:translate-x-0 lg:relative  lg:h-auto lg:p-0 lg:bg-transparent lg:gap-2"
            >
                <h3 class="text-lg font-bold mb-2">Filter by Tags</h3>
                {#each tags as tag}
                    <span>
                        <input
                            type="checkbox"
                            id={tag.tag}
                            value={tag}
                            class=""
                            bind:checked={tag.checked}
                        />
                        <label for={tag.tag} class="text-gray-700"
                            >{tag.tag}</label
                        >
                    </span>
                {/each}
                <div class="flex justify-between mt-4">
                    <button
                        onclick={clearTags}
                        class="active:bg-gray-200 cursor-pointer flex items-center gap-2"
                    >
                        <iconify-icon
                            icon="material-symbols:close"
                            class="text-red-500"
                        ></iconify-icon>
                        <span class="text-gray-700">Clear Filters</span>
                    </button>
                    <button
                        onclick={allTags}
                        class="active:bg-gray-200 cursor-pointer flex items-center gap-2"
                    >
                        <iconify-icon
                            icon="material-symbols:check"
                            class="text-green-500"
                        ></iconify-icon>
                        <span class="text-gray-700">Select All</span>
                    </button>
                    <button
                        onclick={toogleTagPanel}
                        class="active:bg-gray-200 cursor-pointer flex items-center gap-2 lg:hidden"
                    >
                        <iconify-icon
                            icon="material-symbols:close"
                            class="text-green-500"
                        ></iconify-icon>
                        <span class="text-gray-700">Close Filters</span>
                    </button>
                </div>
            </aside>
        </div>

        <ul class="flex flex-col gap-4">
            {#if articles.length === 0}
                <li class="text-gray-500">No articles available.</li>
            {:else}
                <li class="text-gray-500">
                    Total: {tagFilteredArticles.length} articles
                </li>
            {/if}
            {#each tagFilteredArticles as article}
                <li>
                    <ArticleCard {article} />
                </li>
            {/each}
        </ul>
    </div>
</main>
