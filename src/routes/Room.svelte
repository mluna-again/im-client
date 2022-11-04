<script>
	import { fly } from 'svelte/transition';
	import GoBack from '../lib/GoBack.svelte';
  import { maybeConnect } from '../channels/messages.js';

	export let username;
  let user = null;

  $: maybeConnect({id: 2});
</script>

<div in:fly={{ y: 300, duration: 300, delay: 500 }}>
	<GoBack to="/app" />

	<h1>{username}</h1>
</div>

<style>
	div {
		padding-top: 3rem;
	}

	h1 {
		text-align: center;
		font-size: 4rem;
	}
</style>
