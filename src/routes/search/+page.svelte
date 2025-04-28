<script lang="ts">
  import "iconify-icon";
  import articles from "$lib/article/articleList.json";
  import ArticleCard from "$lib/components/home/ArticleCard.svelte";

  let searchQuery = $state("");
  let filteredArticles = $derived(articles.filter((article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase())
  ));
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

  <ul class="flex flex-col gap-4">
    {#if articles.length === 0}
      <li class="text-gray-500">No articles available.</li>
    {:else}
      <li class="text-gray-500">Total: {filteredArticles.length} articles</li>
    {/if}
    {#each filteredArticles as article}
      <li>
        <ArticleCard {article} />
      </li>
    {/each}
  </ul>
</main>
