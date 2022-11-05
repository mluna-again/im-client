<script>
	import { fly } from 'svelte/transition';
	import GoBack from '../lib/GoBack.svelte';
	import Message from '../lib/Message.svelte';
	import Input from '../lib/Input.svelte';
	import Button from '../lib/Button.svelte';
	import { fetchUserByUsername } from '../http/user.js';
	import { fetchMessages, sendMessage } from '../http/message.js';
	import { user } from '../store.js';

	export let username;
	let error = null;
	let friend = null;
	let messages = [];
	let currentMessage = '';
	let sendingMessage = false;

	const fetchUserAndMessages = async (username) => {
		if (friend) return;

		try {
			const user = await fetchUserByUsername(username);
			const data = await fetchMessages(user);
			messages = data;
			friend = user;
		} catch (err) {
			error = err;
		}
	};

	$: fetchUserAndMessages(username);

	const sendMessageHandler = async () => {
		if (!currentMessage || !friend) return;

		sendingMessage = true;

		try {
			sendMessage(friend, currentMessage);
		} catch (err) {
			error = err;
		}

		sendingMessage = false;
	};
</script>

<div class="wrapper" in:fly={{ y: 300, duration: 300, delay: 500 }}>
	<GoBack to="/app" />

	<div class="container">
		<h1>{username}</h1>

		<div class="messages">
			<ul>
				{#each messages as message (message.id)}
					<li>
						<Message
							reverse={$user?.id === message.user.id}
							content={message.content}
						/>
					</li>
				{/each}
			</ul>
		</div>

		<form on:submit|preventDefault={sendMessageHandler} class="form">
			<Input onChange={(value) => (currentMessage = value)} noMotion />
			<div class="submit-btn">
				<Button message="send" size="sm" />
			</div>
		</form>
	</div>
</div>

<style>
	.wrapper {
		height: 100vh;
	}

	.container {
		margin: 1rem 20rem;
		height: 70%;
		transform: skew(2deg);
		padding-top: 3rem;
	}

	h1 {
		text-align: center;
		font-size: 4rem;
	}

	.messages {
		height: 100%;
	}
	ul {
		list-style: none;
		margin-top: 3rem;
		padding: 0 2rem;
		display: flex;
		flex-direction: column;
		height: 100%;
		overflow-y: scroll;
		overflow-x: hidden;
	}

	.form {
		position: relative;
	}

	.submit-btn {
		position: absolute;
		top: 50%;
		left: -5%;
		transform: translateY(-50%);
	}
</style>
