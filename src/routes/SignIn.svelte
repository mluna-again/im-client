<script>
	import { fly } from 'svelte/transition';
	import { navigate } from 'svelte-routing';
	import GoBack from '../lib/GoBack.svelte';
	import Input from '../lib/Input.svelte';
	import Button from '../lib/Button.svelte';

	let username = '';
	let password = '';
	const setUsername = (text) => (username = text);
	const setPassword = (text) => (password = text);

	const validateUsername = (username) => {
		if (username.length < 4) return 'too short';
		if (username.length > 15) return 'too long';

		return null;
	};

	const validatePassword = (password) => {
		if (password.length < 6) return 'too short';
		if (password.length > 72) return 'too long';

		return null;
	};

	let loading = false;
	let error = null;
	const submitHandler = async () => {
		if (!username || !password) {
			error = 'please check your data';
			return;
		}

		const serverUrl = `${import.meta.env.VITE_SERVER_URL}/users`;
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
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});

		loading = false;

		if (!response.ok) {
			error = `server says: ${response.statusText}`;
			return;
		}

		const loginUrl = `${import.meta.env.VITE_SERVER_URL}/log-in`;
		const loginData = {
			user: {
				username,
				password,
			},
		};
		loading = true;
		const loginResponse = await fetch(loginUrl, {
			method: 'POST',
			body: JSON.stringify(loginData),
			credentials: 'include',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});

		if (loginResponse.ok) {
			const { token } = await loginResponse.json();
			window.localStorage.setItem('t', token);
			navigate('/app', { replace: true });
			return;
		}

		navigate('/', { replace: true });
		error = null;
	};
</script>

<div class="container" transition:fly={{ duration: 300, y: 300, delay: 300 }}>
	<GoBack />

	<h1>Sign in</h1>

	<form on:submit|preventDefault={submitHandler}>
		<Input
			placeholder="username"
			onChange={setUsername}
			validate={validateUsername}
		/>
		<Input
			placeholder="password"
			onChange={setPassword}
			validate={validatePassword}
			reverse
			password
		/>

		<div class="btn">
			<Button message={loading ? '...' : 'Create Account'} />
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
		justify-content: center;
		align-items: center;
		position: relative;
	}

	h1 {
		font-size: 4rem;
		margin-top: 2rem;
		margin-bottom: 4rem;
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
