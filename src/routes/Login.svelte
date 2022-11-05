<script>
	import { fly } from 'svelte/transition';
	import { navigate } from 'svelte-routing';
	import GoBack from '../lib/GoBack.svelte';
	import Input from '../lib/Input.svelte';
	import Button from '../lib/Button.svelte';
	import { validateUsername } from '../validators/username.js';
	import { validatePassword } from '../validators/password.js';

	let loading = false;

	let username = '';
	let password = '';
	const setUsername = (text) => (username = text);
	const setPassword = (text) => (password = text);

	let error = null;
	const submitHandler = async () => {
		if (!username || !password) {
			error = 'please check your data';
			return;
		}

		const serverUrl = `${import.meta.env.VITE_SERVER_URL}/log-in`;
		const data = {
			user: {
				username,
				password,
			},
		};
		loading = true;
		const response = await fetch(serverUrl, {
			method: 'POST',
			body: JSON.stringify(data),
			credentials: 'include',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			error = `server says: ${response.statusText}`;
			loading = false;
			return;
		}

		const { token } = await response.json();
		window.localStorage.setItem('t', token);
		navigate('/app', { replace: true });
		error = null;
	};
</script>

<div class="container" transition:fly={{ duration: 300, y: 300, delay: 300 }}>
	<GoBack />

	<h1>Log in</h1>

	<form on:submit|preventDefault={submitHandler}>
		<Input
			placeholder="username"
			validate={validateUsername}
			onChange={setUsername}
		/>
		<Input
			placeholder="password"
			validate={validatePassword}
			onChange={setPassword}
			password
			reverse
		/>

		<div class="btn">
			<Button message={loading ? 'Loading...' : 'Log in'} />
		</div>
	</form>

	{#if error}
		<p class="err">{error}</p>
	{/if}
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

	.err {
		margin-top: 2rem;
		font-size: 3rem;
	}
</style>
