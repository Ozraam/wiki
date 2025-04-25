<script lang="ts">
	import '../app.css';
	import { pwaInfo } from 'virtual:pwa-info';
	import NavBar from '$lib/components/NavBar.svelte';
  import AppBar from '$lib/components/AppBar.svelte';
	
	let { children } = $props();
	let webManifestLink = $derived(pwaInfo ? pwaInfo.webManifest.linkTag : null);
</script>

<svelte:head>
	{@html webManifestLink}
</svelte:head>


<AppBar />


{@render children()}

<NavBar />
