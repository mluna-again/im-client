<script>
	import { onDestroy } from 'svelte';

	let dots = '...';
	const intervalId = setInterval(() => {
		if (dots.length >= 3) {
			dots = '.';
			return;
		}

		dots = '.'.repeat(dots.length + 1);
	}, 500);

	onDestroy(() => {
		clearInterval(intervalId);
	});
</script>

<span>typing{dots}</span>

<style>
	span {
		font-family: 'Poor Story', cursive;
	}
</style>
