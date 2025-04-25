<script lang="ts">
    import { page } from '$app/state';
    import "iconify-icon";
  const navItems = [
    { name: "Home", href: "/", icon: "mdi:home" },
    { name: "Search", href: "/search", icon: "oui:ws-search" },
    { name: "Account", href: "/account", icon: "material-symbols:account-circle" },
  ];
</script>

<nav class="bg-gray-100 dark:bg-gray-800 dark:text-white shadow-md py-4 fixed bottom-0 w-full z-10">
  <ul class="flex justify-around">
    {#each navItems as item}
      <li>
        <a href={item.href} class="flex flex-col items-center">
          {#if item.icon}
            <iconify-icon icon={item.icon} class="text-2xl w-15 h-8 rounded-full flex items-center {page.url.pathname == item.href ? "bg-blue-100" : ""}"></iconify-icon>
          {/if}

          <p >
            {item.name}
          </p>
        </a>
      </li>
    {/each}
  </ul>
</nav>
