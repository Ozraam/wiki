<script lang="ts">
  import type { Article } from "$lib/type";

  const { article }: { article: Article } = $props();
</script>

<a
  href="/article/{article.id}"
  class="flex flex-col p-4 rounded-xl shadow-md ring ring-gray-200"
>
  <h3 class="text-lg font-bold mt-2 ">{article.title}</h3>
  <small>
    <span class="text-gray-500">{article.author}</span> -
    <span class="text-gray-500">{new Date(article.date).toLocaleDateString()}</span>
  </small>
  <p class="text-gray-600 text-ellipsis">{article.description}</p>
</a>
