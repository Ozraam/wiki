<script lang="ts">
	import '../app.css';
	import { pwaInfo } from 'virtual:pwa-info';
	
	let { children } = $props();
	let webManifestLink = $derived(pwaInfo ? pwaInfo.webManifest.linkTag : null);
</script>

<svelte:head>
	{@html webManifestLink}
</svelte:head>

{@render children()}
