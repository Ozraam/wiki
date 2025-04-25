<script lang="ts">
  import { onMount } from "svelte";

  let hide = $state(false);
  let lastScrollY = $state(0);
  let threshold = 50; // Minimum scroll distance to trigger visibility change

  let colorChange = $state(false);

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

      // change color based on scroll position
      if (currentScrollY > 10) {
        colorChange = true;
      } else {
        colorChange = false;
      }
    });
  });
</script>

<header
  class=" sticky top-0 flex w-full items-center justify-center p-4 dark:bg-gray-800 dark:text-white transition-transform {hide
    ? '-translate-y-full'
    : ''}
    {colorChange ? 'bg-gray-100 text-black' : 'bg-white text-gray-800'} z-10"
>
  <h1 class="font-bold text-2xl">FE Wiki</h1>
</header>
