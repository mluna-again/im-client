<script>
	import { fly } from 'svelte/transition';
	import GoBack from '../lib/GoBack.svelte';
	import { maybeConnect } from '../channels/messages.js';
	import { fetchUserByUsername } from '../http/user.js';

	export let username;
	let user = null;
  let error = null;
  let friend = null;

	$: maybeConnect(user);

  fetchUserByUsername(username)
  .then(data => friend = data)
  .catch(err => error = err);

  $: console.log(user)
</script>

<div class="wrapper" in:fly={{ y: 300, duration: 300, delay: 500 }}>
	<GoBack to="/app" />

  <div class="container">
    <h1>{username}</h1>
  </div>
</div>

<style>
  .wrapper {
    height: 100vh;
  }

	.container {
    margin: 1rem 20rem;
    height: calc(100% - 2rem);
    transform: skew(2deg);
		padding-top: 3rem;
    border: 7px solid black;
	}

	h1 {
		text-align: center;
		font-size: 4rem;
	}
</style>
