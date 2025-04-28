<script lang="ts">
    const { tags, class: classname } : { tags: string[], class: string} = $props();
</script>

<ul>
    {#each tags as tag}
        <li class="inline-block bg-gray-200 text-gray-700 rounded-full px-2 py-0.5 text-xs font-semibold mr-2 mb-2 dark:bg-gray-700 dark:text-gray-300 {classname}">
            {tag}
        </li>
    {/each}
</ul>