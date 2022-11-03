<script>
	import Button from './Button.svelte';

	export let user;

	let loading = false;
	const addFriendHandler = async () => {
		loading = true;

		const serverUrl = `${import.meta.env.VITE_SERVER_URL}/friends/request`;
		const data = { user_id: user.id };
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
		user = { ...user, invitation_sent: true };
	};
</script>

<div class="container">
	<div>
		<h1>
			{user.username}
		</h1>
		{#if user.invitation_received && !user.invitation_sent}
			<span>{user.username} send you a friend request!</span>
		{/if}
	</div>

	<div>
		{#if loading}
			<Button disabled message="..." size="sm" />
		{:else if user.invitation_sent && !user.invitation_received}
			<Button disabled message="request sent" size="sm" />
		{:else if user.invitation_received && !user.invitation_sent}
			<Button
				red
				message="accept request"
				size="sm"
				onClick={addFriendHandler}
			/>
		{:else if (user.invitation_sent && user.invitation_received) || user.friends}
			<Button disabled message="already friends" size="sm" />
		{:else}
			<Button message="add friend" size="sm" onClick={addFriendHandler} />
		{/if}
	</div>
</div>

<style>
	.container {
		display: flex;
		justify-content: space-between;
		margin: 20px 0;
		background-color: white;
		color: black;
		padding: 7px;
		transform: skew(7deg);
		width: 100%;
	}
</style>
