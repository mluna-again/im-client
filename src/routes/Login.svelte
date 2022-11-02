<script>
	import { fly } from 'svelte/transition';
	import { navigate } from 'svelte-routing';
	import GoBack from '../lib/GoBack.svelte';
	import Input from '../lib/Input.svelte';
	import Button from '../lib/Button.svelte';
</script>

<div class="container" in:fly={{ duration: 300, y: 200 }}>
	<GoBack />

	<h1>Log in</h1>

	<form on:submit|preventDefault={submitHandler}>
		<Input placeholder="username" />
		<Input placeholder="password" reverse />

		<div class="btn">
			<Button message="Log in" />
		</div>
	</form>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	h1 {
		font-size: 4rem;
		margin-top: 2rem;
		margin-bottom: 2rem;
	}

	.btn {
		margin-top: 2rem;
		display: flex;
		justify-content: center;
	}
</style>
