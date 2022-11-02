<script>
	import { fly } from 'svelte/transition';
</script>

<div class="container" in:fly={{ duration: 300, y: 200 }}>
	<h1>Log in</h1>
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
	}

	h1 {
		font-size: 4rem;
		margin-top: 2rem;
	}
</style>
