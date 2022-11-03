<script>
	import Button from './Button.svelte';

	export let request;

	let loading = false;
	let error = null;
	let accepted = false;

	const acceptUserHandler = async () => {
		loading = true;

		const serverUrl = `${import.meta.env.VITE_SERVER_URL}/friends/request`;
		const data = { user_id: request.id };
		const response = await fetch(serverUrl, {
			method: 'POST',
			body: JSON.stringify(data),
			credentials: 'include',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});
		loading = false;

		if (!response.ok) {
			error = 'something went wrong!';
			return;
		}

		accepted = true;
	};
</script>

<span>{request.username} -></span>
{#if loading}
	<Button red message="..." size="sm" />
{:else if accepted}
	<Button white message="already friends" size="sm" />
{:else if error}
	<Button message={error} size="sm" />
{:else}
	<Button red message="accept request" size="sm" onClick={acceptUserHandler} />
{/if}

<style>
	span {
		font-size: 5rem;
		margin-right: 3rem;
	}
</style>
