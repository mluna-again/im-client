<script>
	import Button from './Button.svelte';

	export let user;
</script>

<div class="container">
	<h1>
		{user.username}
	</h1>

	<div>
		{#if user.invitation_sent}
			<Button disabled message="request sent" size="sm" />
		{:else}
			<Button message="add friend" size="sm" />
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
