<script>
	import NoFriends from './NoFriends.svelte';

	export let user;

	// TODO: add avatars
	const iconIndex = () => Math.floor(Math.random() * 7) + 1;
	const iconPath = () => `/icons/${iconIndex()}.png`;

	$: usersWithAvatar = user?.friends?.map((user) => ({
		...user,
		avatar: iconPath(),
	}));
</script>

<div class="container">
	{#if usersWithAvatar?.length < 1}
		<NoFriends />
	{:else}
		<ul>
			{#each usersWithAvatar as friend}
				<li class="friend">
					<div class="imgContainer">
						<img src={friend.avatar} alt="{friend.username} icon" />
					</div>

					<p class="message">say hi to {friend.username}</p>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
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
</style>
