<script>
	import { fly } from 'svelte/transition';
  import GoBack from '../lib/GoBack.svelte';

	export let username;
</script>

<div in:fly={{ y: 300, duration: 300, delay: 400 }}>
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
