<script>
	import { Link } from 'svelte-routing';
	import { fly } from 'svelte/transition';
	import NoFriends from './NoFriends.svelte';
	import MessageDateLabel from './MessageDateLabel.svelte';
	import TypingIndicator from './TypingIndicator.svelte';
	import { ICONS } from '../icons.js';

	export let user;
</script>

<div class="container">
	{#if user?.friends?.length < 1}
		<NoFriends />
	{:else}
		<ul>
			{#each user?.friends as friend, index (friend.id)}
				<div
					in:fly={{ y: 50, duration: 300, delay: 300 + index * 50 }}
					out:fly={{ y: 50, duration: 300, delay: index * 50 }}
				>
					<Link to="/app/{friend.username}">
						<button>
							<li class="friend">
								<div class="date">
									<MessageDateLabel
										date={friend.last_message_date ||
											friend.friends_since ||
											new Date()}
									/>
								</div>

								<div class="imgContainer">
									<img
										src={`/icons/${friend.icon}.png`}
										alt="{friend.username} icon"
									/>
								</div>

								<span class="message"
									>{friend.last_message || `say hi to ${friend.username}`}</span
								>
								{#if friend.pending_messages_count > 0}
									<span class="pending">{friend.pending_messages_count}</span>
								{/if}
								{#if friend.typing}
									<div class="typing">
										<TypingIndicator />
									</div>
								{/if}
							</li>
						</button>
					</Link>
				</div>
			{/each}
		</ul>
	{/if}
</div>

<style>
	button {
		text-decoration: none;
		display: block;
		width: 100%;
		background: none;
		border: none;
		text-align: left;
	}
	.container {
		margin: 0 auto;
		width: 60%;
		height: 90%;
	}

	.container ul::-webkit-scrollbar {
		display: none;
	}

	.container ul {
		height: 90%;
		overflow-y: scroll;
		overflow-x: hidden;
		padding-bottom: 9rem;
		scrollbar-width: none;
	}

	.friend img {
		height: 50px;
		width: 50px;
		border: 4px solid white;
		transform: skew(5deg);
	}

	.imgContainer {
		border: 4px solid black;
		background-color: black;
		width: 58px;
		height: 58px;
		transform: skew(5deg);
		z-index: 3;
	}

	.friend {
		display: flex;
		margin: 2rem 0;
		align-items: center;
		cursor: pointer;
		position: relative;
	}

	.date {
		position: absolute;
		top: -10px;
		left: 5%;
		z-index: 10;
	}

	.message {
		padding: 0.5rem 0;
		padding-left: 1rem;
		margin-left: -10px;
		background-color: black;
		min-width: 90%;
		clip-path: polygon(0% 0%, 100% -10%, 95% 100%, 0% 110%, 0% 0%);
		border: none;
		font-family: 'Poor Story', cursive;
		font-size: 1.5rem;
	}

	.pending {
		position: absolute;
		top: 0;
		right: 8%;
		background-color: #cc0102;
		font-size: 1.2rem;
		padding: 3px;
		transform: skew(-10deg);
		border: 3px solid white;
	}

	.typing {
		position: absolute;
		top: 50%;
		right: 15%;
		transform: translateY(-50%);
	}
</style>
