<script lang="ts" context="module">
	import Header from '@components/nav/header.svelte';
	import Content from '@components/nav/content.svelte';
	import Leftnav from '@components/nav/leftnav.svelte';
	import Rightnav from '@components/nav/rightnav.svelte';
	import Footer from '@components/nav/footer.svelte';
	import { resourcesStore } from '@modules/stores';

	export const load = async ({ fetch }) => {
		const res = await fetch('/resources');
		if (res.ok) {
			return {
				props: { resources: await res.json() }
			};
		}
		return {
			status: res.status,
			error: await res.text()
		};
	};

</script>

<script lang="ts">
	export let resources: any[];
	resourcesStore.set(resources);
</script>

<svelte:head>
	<title>Code.Build</title>
</svelte:head>

{#if false}<slot />{/if}

<div class="wrapper">
	<header class="header">
		<Header />
	</header>
	<aside class="rightnav">
		<Rightnav />
	</aside>
	<article class="content">
		<Content />
	</article>
	<nav class="leftnav">
		<Leftnav />
	</nav>
	<footer class="footer">
		<Footer />
	</footer>
</div>

<style global>
	.header {
		grid-area: header;
	}
	.content {
		grid-area: content;
	}
	.rightnav {
		grid-area: rightnav;
	}
	.leftnav {
		grid-area: leftnav;
	}
	.footer {
		grid-area: footer;
		text-align: center;
	}
	.wrapper {
		margin: 20px;
		display: grid;
		gap: 20px;
		grid-template-areas:
			'header'
			'rightnav'
			'content'
			'leftnav'
			'footer';
	}
	@media (min-width: 500px) {
		.wrapper {
			grid-template-columns: 1fr 3fr;
			grid-template-rows: 0fr 0fr 1fr;
			grid-template-areas:
				'header header'
				'rightnav content'
				'leftnav content'
				'footer footer';
		}
		nav ul {
			flex-direction: column;
		}
	}
	@media (min-width: 700px) {
		.wrapper {
			grid-template-columns: 1fr 3fr 1fr;
			grid-template-rows: 1fr;
			grid-template-areas:
				'header header header'
				'leftnav content rightnav'
				'footer footer footer';
		}
		nav ul {
			flex-direction: column;
		}
	}
</style>
