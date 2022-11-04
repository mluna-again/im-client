<script>
	import { fly } from 'svelte/transition';
	import GoBack from '../lib/GoBack.svelte';
	import Message from '../lib/Message.svelte';
	import { fetchUserByUsername } from '../http/user.js';
	import { fetchMessages } from '../http/message.js';
  import { user } from '../store.js';

	export let username;
	let error = null;
	let friend = null;
	let messages = [];

	const fetchUserAndMessages = async (username) => {
		console.log('fetching messages');
		if (friend) return;

		try {
			const user = await fetchUserByUsername(username);
			const data = await fetchMessages(user);
			messages = data;
		} catch (err) {
			error = err;
		}
	};

	$: fetchUserAndMessages(username);
</script>

<div class="wrapper" in:fly={{ y: 300, duration: 300, delay: 500 }}>
	<GoBack to="/app" />

	<div class="container">
		<h1>{username}</h1>

		<div class="messages">
			<ul>
				{#each messages as message (message.id)}
					<li>
            <Message reverse={$user?.id === message.user.id} content={message.content} />
          </li>
				{/each}
			</ul>
		</div>
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
	}

	h1 {
		text-align: center;
		font-size: 4rem;
	}

  ul {
    list-style: none;
    margin-top: 3rem;
    padding: 0 2rem;
    display: flex;
    flex-direction: column;
  }
</style>
