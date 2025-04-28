<script lang="ts">
    import SvelteMarkdown from "svelte-markdown";

    let content = $state("");

    let isPreview = $state(false);
</script>

<h2 class="text-2xl font-semibold mb-4">
    Create a new article
</h2>

<form method="POST" action="/create" class="flex flex-col gap-4">
    <label for="title">Title</label>
    <input type="text" id="title" name="title" required class="border p-2" />

    <label for="description">Description</label>
    <textarea id="description" name="description" required class="border p-2"></textarea>

    <label for="author">Author</label>
    <input type="text" id="author" name="author" required class="border p-2" />

    <label for="tags">Tags (comma separated)</label>
    <input type="text" id="tags" name="tags" class="border p-2" />

    <label for="content">Content</label>
    <textarea id="content" name="content" required class="border p-2" bind:value={content}></textarea>

    <button type="submit" class="bg-blue-500 text-white p-2 active:bg-gray-200">Create Article</button>
    <button type="button" class="bg-blue-500 text-white p-2 active:bg-gray-200" onclick={() => isPreview = !isPreview}>Preview</button>

</form>

<div class="prose h-full w-full fixed z-20 top-0 left-0 bg-white p-4 overflow-auto transition-transform duration-500 {isPreview ? 'translate-x-0' : 'translate-x-full'}">
    <h3 class="text-lg font-bold mb-2 flex items-center gap-2">
        <button aria-label="Close preview" onclick={() => isPreview = false} class="flex items-center cursor-pointer">
            <iconify-icon icon="material-symbols:close-rounded" class="text-3xl"></iconify-icon>
        </button>
        Preview
    </h3>

    <SvelteMarkdown source={content} />
</div>