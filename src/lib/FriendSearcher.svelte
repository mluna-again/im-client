<script>
	import { fly } from 'svelte/transition';
	import debounce from 'lodash.debounce';
	import Input from './Input.svelte';
	import UserCard from './UserCard.svelte';
	import Button from './Button.svelte';

	export let user;
	let userList = [];

	let query = '';
	const fetchUsers = async (_user) => {
		const serverUrl =
			`${import.meta.env.VITE_SERVER_URL}/users?` +
			new URLSearchParams({
				search: query,
				limit: 10,
			});

		const response = await fetch(serverUrl, { credentials: 'include' });
		const data = await response.json();
		userList = data;
	};

	let debouncedFetch = debounce(fetchUsers, 500);
	const changeHandler = (q) => {
		query = q;
		debouncedFetch();
	};

	$: fetchUsers(user);

	let overlayVisible = false;
</script>

<div class="container">
	<Button
		message="Add friends"
		onClick={() => (overlayVisible = true)}
		size="sm"
		fullWidth
	/>

	{#if overlayVisible}
		<div class="overlay" on:click={() => (overlayVisible = false)}>
			<div on:click|stopPropagation transition:fly={{ y: 300, duration: 300 }}>
				<Input placeholder="Search friends" onChange={changeHandler} />
				<ul class="list">
					{#each userList as user}
						<li>
							<UserCard {user} />
						</li>
					{/each}
				</ul>
			</div>
		</div>
	{/if}
</div>

<style>
	.overlay {
		z-index: 10;
		height: 100vh;
		width: 100vw;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.7);
		padding: 5rem;
		padding-top: 2rem;
	}

	.overlay > div {
		height: 100%;
		width: 100%;
	}

	.list ul::-webkit-scrollbar {
		display: none;
	}
	.list {
		scrollbar-width: none;
		height: 100%;
		width: 100%;
		padding: 0 1rem;
		padding-bottom: 4rem;
		overflow-y: scroll;
		list-style: none;
	}

	@media (max-width: 650px) {
		.container {
			width: 100%;
		}
	}
</style>
