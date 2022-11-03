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
				{#each userList as user}
					<UserCard {user} />
				{/each}
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
		padding: 5rem 9rem;
		background-color: rgba(0, 0, 0, 0.3);
	}

	@media (max-width: 650px) {
		.container {
			width: 100%;
		}
	}
</style>
