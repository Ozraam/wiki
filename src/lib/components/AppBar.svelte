<script lang="ts">
  import { onMount } from "svelte";

  let hide = $state(false);
  let lastScrollY = $state(0);
  let threshold = 5; // Minimum scroll distance to trigger visibility change

  onMount(() => {
    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;
      // Only change visibility state if scroll difference exceeds threshold
      if (Math.abs(currentScrollY - lastScrollY) > threshold) {
        if (currentScrollY > lastScrollY) {
          hide = true;
        } else {
          hide = false;
        }
        lastScrollY = currentScrollY;
      }
    });
  });
</script>

<header
  class="bg-white sticky top-0 flex w-full items-center justify-center p-4 dark:bg-gray-800 dark:text-white transition-transform {hide
    ? '-translate-y-full'
    : ''}"
>
  <h1 class="font-bold text-2xl">FE Wiki</h1>
</header>
