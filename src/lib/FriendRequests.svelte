<script>
	import { fly, fade } from 'svelte/transition';
	import Button from './Button.svelte';
	import RequestCard from './RequestCard.svelte';

	export let user;
	$: counter = user?.friend_requests?.length;

	let showList = false;
</script>

<button
	class="container"
	title="Friend Requests"
	on:click={() => (showList = !showList)}
>
	<svg viewBox="0 0 357 438" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			id="message"
			d="M53.5 64L9.5 127L64.5 291.5L129.5 285.5L178 322.5L125.5 362.5L244 430.5L196 362.5L249 338.5L216 281.5L337 266.5L347.5 10.5L53.5 64Z"
			stroke="black"
			stroke-width="17"
		/>
	</svg>
	<span class="msg">requests</span>
	<span class="counter">{counter < 101 ? counter : '99+'}</span>
</button>

{#if showList}
	<div
		class="list"
		on:click={() => (showList = false)}
		transition:fade={{ y: 300, duration: 300 }}
	>
		<h1>Friend Requests</h1>
		{#each user.friend_requests as request (request.id)}
			<div
				on:click|stopPropagation
				class="friend"
				transition:fly={{ y: 300, duration: 300 }}
			>
				<RequestCard {request} />
			</div>
		{/each}

		{#if user?.friend_requests?.length < 1}
			<h1>how empty...</h1>
		{/if}
	</div>
{/if}

<style>
	.container {
		background: none;
		border: none;
		font-family: 'Earwig Factory';
		position: relative;
		width: 100px;
		height: 95px;
		cursor: pointer;
	}

	.container:hover {
		transform: rotate(-5deg);
		transform-origin: bottom center;
	}

	svg {
		width: 100%;
		height: 100%;
		fill: white;
		position: relative;
	}

	.counter {
		color: #cc0102;
		position: absolute;
		font-size: 2rem;
		top: 35%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.msg {
		padding: 3px;
		background-color: black;
		color: white;
		position: absolute;
		font-size: 0.8rem;
		top: 15%;
		left: 20%;
		transform: translate(-50%, -50%) rotate(-20deg);
	}

	.list {
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		background-color: rgba(0, 0, 0, 0.7);
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 3rem;
		z-index: 10;
		overflow: scroll;
		scrollbar-width: none;
	}

	.list::-webkit-scrollbar {
		display: none;
	}

	.list h1 {
		margin-bottom: 3rem;
	}

	.list .friend {
		margin: 3rem 0;
	}
</style>
