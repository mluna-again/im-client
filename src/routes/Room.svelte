<script>
	import { fly } from 'svelte/transition';
	import GoBack from '../lib/GoBack.svelte';
	import Message from '../lib/Message.svelte';
	import Input from '../lib/Input.svelte';
	import Button from '../lib/Button.svelte';
	import { fetchUserByUsername } from '../http/user.js';
	import { fetchMessages, sendMessage } from '../http/message.js';
	import { user, messagesChannel } from '../store.js';

	export let username;
	let error = null;
	let friend = null;
	let messages = [];
	let currentMessage = '';
	let sendingMessage = false;

	const scrollMessages = () => {
		const list = document.getElementById('messages-list');
		if (!list) return;

		list.scrollTop = list.scrollHeight;
	};

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

		setTimeout(scrollMessages, 100); // this makes me sad
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

	const addNewMessage = (message) => {
		messages = [...messages, message];
		currentMessage = '';
		friend = { ...friend, typing: false };

		setTimeout(scrollMessages, 100); // this makes me sad again
	};

	const changeMessageHandler = (value) => {
		currentMessage = value;
		$messagesChannel?.push('typing', { to: friend.id });
	};

	const startTyping = ({ from: fromId }) => {
		if (fromId != friend.id) return;

		friend = { ...friend, typing: true };
	};

	const stopTyping = ({ from: fromId }) => {
		if (fromId != friend.id) return;

		friend = { ...friend, typing: false };
	};

	// CHANNEL EVENTS
	messagesChannel.subscribe((channel) => {
		if (!channel) return;

		channel.off('new_message', addNewMessage);
		channel.on('new_message', addNewMessage);
		channel.off('typing', startTyping);
		channel.on('typing', startTyping);
		channel.off('stop_typing', stopTyping);
		channel.on('stop_typing', stopTyping);
	});
</script>

<div class="wrapper" in:fly={{ y: 300, duration: 300, delay: 500 }}>
	<GoBack to="/app" />

	<div class="container">
		<h1>{username}</h1>
    {#if friend?.typing}
      <h3>typing...</h3>
    {/if}

		<div class="messages">
			<ul id="messages-list">
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
			<Input value={currentMessage} onChange={changeMessageHandler} noMotion />
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

  h3 {
    margin-top: 1.5rem;
		text-align: center;
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

	@media (max-width: 1100px) {
		.container {
			margin: 1rem 10rem;
		}
	}

	@media (max-width: 800px) {
		.container {
			margin: 1rem 5rem;
		}
	}
	@media (max-width: 600px) {
		.container {
			margin: 1rem 2rem;
		}
	}
</style>
