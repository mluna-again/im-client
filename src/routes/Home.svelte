<script>
	import { fly } from 'svelte/transition';
	import Button from '../lib/Button.svelte';
</script>

<div class="container" transition:fly={{ y: 300, duration: 300 }}>
	<h1>Welcome to IM!</h1>

	<div class="btn">
		<Button message={'Log in'} to="/log-in" />
	</div>

	<div class="btn">
		<Button message={'Create Account'} to="/sign-in" />
	</div>
</div>

<style>
	.container {
		height: 100%;
		width: 100%;
		display: flex;
		padding-top: 3rem;
		flex-direction: column;
		align-items: center;
	}

	h1 {
		font-size: 4rem;
		margin-bottom: 3rem;
	}

	.btn {
		margin: 10px 0;
	}
</style>
