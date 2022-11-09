<script>
	import { navigate } from 'svelte-routing';
	import { fly, fade } from 'svelte/transition';
	import { Socket } from 'phoenix';
	import Logo from '../lib/Logo.svelte';
	import Logout from '../lib/Logout.svelte';
	import FriendSearcher from '../lib/FriendSearcher.svelte';
	import FriendRequests from '../lib/FriendRequests.svelte';
	import FriendList from '../lib/FriendList.svelte';
	import { maybeConnect as maybeConnectMessages } from '../channels/messages.js';
	import { maybeConnect as maybeConnectRequests } from '../channels/requests.js';
	import {
		requestsChannel,
		messagesChannel,
		user as userStore,
	} from '../store.js';

	let user = null;

	const addNewRequest = (request) => {
		user = { ...user, friend_requests: [...user.friend_requests, request] };
	};

	const newFriend = (friend) => {
		user = { ...user, friends: [...user.friends, friend] };
	};

	const removeRequest = ({ user_to_remove }) => {
		user = {
			...user,
			friend_requests: user.friend_requests.filter(
				(req) => req.id !== user_to_remove.id
			),
			friends: [...user.friends, user_to_remove],
		};
	};

	const addNewMessage = (message) => {
		user = {
			...user,
			friends: user.friends.map((friend) => {
				if (friend.id === message.user.id)
					return {
						...friend,
						pending_messages_count: (friend.pending_messages_count || 0) + 1,
						last_message: message.content,
					};
				return friend;
			}),
		};
	};

	const startTyping = ({ from: fromId }) => {
		const friends = user.friends.map((friend) => {
			if (friend.id != fromId) return friend;
			return { ...friend, typing: true };
		});
		user = { ...user, friends };
	};

	const stopTyping = ({ from: fromId }) => {
		const friends = user.friends.map((friend) => {
			if (friend.id != fromId) return friend;
			return { ...friend, typing: false };
		});
		user = { ...user, friends };
	};

	requestsChannel.subscribe((channel) => {
		if (!channel) return;

		// avoid duplicate events
		channel.off('new_request', addNewRequest);
		channel.off('new_friend', newFriend);
		channel.off('remove_request', removeRequest);
		channel.on('new_request', addNewRequest);
		channel.on('new_friend', newFriend);
		channel.on('remove_request', removeRequest);
	});

	messagesChannel.subscribe((channel) => {
		if (!channel) return;

		channel.off('new_message', addNewMessage);
		channel.on('new_message', addNewMessage);
		channel.off('typing', startTyping);
		channel.on('typing', startTyping);
		channel.off('stop_typing', stopTyping);
		channel.on('stop_typing', stopTyping);
	});

	const fetchUser = async () => {
		const serverUrl = `${import.meta.env.VITE_SERVER_URL}/users/logged`;
		const response = await fetch(serverUrl, { credentials: 'include' });
		if (!response.ok && response.status === 401) {
			navigate('/', { replace: true });
			return;
		}
		const data = await response.json();
		user = data;

		userStore.set(data);
	};

	fetchUser();
</script>

{#if user}
	<div
		class="container"
		in:fly={{ y: 300, duration: 300, delay: 200 }}
		out:fly={{ y: 300, duration: 300 }}
	>
		<div
			class="phone"
			in:fly={{ y: 200, duration: 300 }}
			out:fly={{ y: 200, duration: 300, delay: 200 }}
		>
			<div class="logout">
				<Logout />
			</div>
			<div class="logo">
				<Logo />
			</div>

			<div class="header">
				<div class="user">
					<FriendRequests {user} />
					<button on:click={() => navigate('/settings')} title="Go to Settings">
						<img src="/icons/{user.icon}.png" alt={user.username} />
						<h1 class="username">{user.username}</h1>
					</button>
				</div>

				<FriendSearcher {user} />
			</div>
		</div>
		<div class="list">
			<FriendList {user} />
		</div>
	</div>
{:else}
	<h1 transition:fade={{ duration: 300 }} class="loading">Loading...</h1>
{/if}

<style>
	.loading {
		font-size: 5rem;
		text-align: center;
		margin-top: 3rem;
	}

	.container {
		display: flex;
		align-items: center;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}

	.list {
		height: 100%;
		width: 100%;
	}

	.phone {
		position: relative;
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
		flex-basis: 20%;
	}

	.header .user {
		display: flex;
		align-items: center;
	}

	.header button {
		background: none;
		border: none;
		font-family: 'Earwig Factory', cursive;
		display: flex;
		align-items: center;
		cursor: pointer;
	}

	.header img {
		height: 50px;
		width: 50px;
		background-color: black;
		border: 4px solid white;
		transform: skew(10deg);
		margin-right: 10px;
	}

	.header h1 {
		font-size: 4rem;
	}

	@media (max-width: 800px) {
		.header .username {
			font-size: 2rem;
		}
	}

	@media (max-width: 650px) {
		.header {
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		.header .user {
			margin-bottom: 1rem;
		}
	}
</style>
