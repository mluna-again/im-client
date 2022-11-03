<script>
	import { navigate } from 'svelte-routing';
	import { fly } from 'svelte/transition';
	import { Socket } from 'phoenix';
	import Logo from '../lib/Logo.svelte';
	import Logout from '../lib/Logout.svelte';
	import FriendSearcher from '../lib/FriendSearcher.svelte';
	import FriendRequests from '../lib/FriendRequests.svelte';

	let user = null;
	let socket = null;
	let channel = null;

	const connectSocket = () => {
		socket = new Socket(`${import.meta.env.VITE_SERVER_WS}/socket`, {
			params: { token: window.localStorage.getItem('t') },
		});
		socket.connect();
		channel = socket.channel('messages:' + user.id);
		channel.join().receive('ok', () => console.log('joined channel'));
		channel.on('new_request', (request) => {
			user = { ...user, friend_requests: [...user.friend_requests, request] };
		});

		channel.on('remove_request', ({ user_to_remove }) => {
			user = {
				...user,
				friend_requests: user.friend_requests.filter(
					(req) => req.id !== user_to_remove.id
				),
				friends: [...user.friends, user_to_remove],
			};
		});
	};

	const fetchUser = async () => {
		const serverUrl = `${import.meta.env.VITE_SERVER_URL}/users/logged`;
		const response = await fetch(serverUrl, { credentials: 'include' });
		if (!response.ok && response.status === 401) {
			navigate('/', { replace: true });
			return;
		}
		const data = await response.json();
		user = data;
		connectSocket(data);
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
				<div class="user">
					<FriendRequests {user} />
					<h1>{user.username}</h1>
				</div>

				<FriendSearcher {user} />
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

	.header .user {
		display: flex;
		align-items: center;
	}

	.header h1 {
		font-size: 4rem;
	}
</style>
