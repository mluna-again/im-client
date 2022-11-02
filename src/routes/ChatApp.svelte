<script>
	import { navigate } from 'svelte-routing';
	import { fly } from 'svelte/transition';
	import Logo from '../lib/Logo.svelte';
	import Logout from '../lib/Logout.svelte';
	import FriendSearcher from '../lib/FriendSearcher.svelte';

	let user = null;
	const fetchUser = async () => {
		console.log('fetching user...');
		const serverUrl = `${import.meta.env.VITE_SERVER_URL}/users/logged`;
		const response = await fetch(serverUrl, { credentials: 'include' });
		if (!response.ok && response.status === 401) {
			navigate('/', { replace: true });
			return;
		}
		const data = await response.json();
		user = data;
	};
	fetchUser();
</script>

{#if user}
	<div class="container">
		<div class="phone" in:fly={{ y: 200, duration: 300 }}>
			<div class="logout">
				<Logout />
			</div>
			<div class="logo">
				<Logo />
			</div>

			<div class="header">
				<h1>{user.username}</h1>
				<FriendSearcher />
			</div>
		</div>
	</div>
{:else}
	<h1 in:fly={{ y: 200, duration: 300 }} class="loading">Loading...</h1>
{/if}

<style>
	.loading {
		font-size: 5rem;
		text-align: center;
		margin-top: 3rem;
	}

	.container {
		display: flex;
		justify-content: center;
	}

	.phone {
		position: relative;
		height: 100vh;
		width: 60%;
		padding-top: 8rem;
	}

	.logout {
		position: absolute;
		top: 0;
		right: 0;
	}

	.logo {
		position: absolute;
		top: 0;
		left: 0;
	}

	.header {
		display: flex;
		justify-content: space-between;
	}
</style>
