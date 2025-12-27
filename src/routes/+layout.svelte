<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import NavBar from '$lib/components/NavBar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children, data } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /><title>TaskFlow</title></svelte:head>
<NavBar user={data.user} />
{@render children()}
<Footer />
