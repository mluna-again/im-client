<script>
	import { onDestroy } from 'svelte';
	import { fly } from 'svelte/transition';

	let dots = '...';
	let intervalId = setInterval(() => {
		if (dots.length >= 3) {
			dots = '';
			return;
		}

		dots = '.'.repeat(dots.length + 1);
	}, 400);

	onDestroy(() => {
		clearInterval(intervalId);
	});
</script>

<div class="container" transition:fly={{ y: 300, duration: 300 }}>
	<svg
		width="550"
		height="250"
		viewBox="0 0 550 250"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			fill="black"
			id="big-message"
			d="M15 245L4 4H445.5L438.5 86L473.5 63.5L513 106.5H555.5L513 130L473.5 86L438.5 119.5L421 212.5L15 245Z"
			stroke="white"
			stroke-width="7"
		/>
	</svg>
	<div class="text">
		<h1>connection lost</h1>
		<h1>trying to reconnect{dots}</h1>
	</div>
</div>

<style>
	.container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		z-index: 999;
		background-color: rgba(0, 0, 0, 0.7);
	}

	.text {
		z-index: 1000;
		position: absolute;
		top: 48%;
		left: 49%;
		transform: translate(-50%, -50%);
		width: 400px;
		text-align: left;
	}

	h1 {
		font-size: 2rem;
		margin: 2rem 0;
		color: white;
	}
</style>
