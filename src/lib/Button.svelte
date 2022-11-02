<script>
	import { Link } from 'svelte-routing';

	export let message;
	export let white = false;
	export let to = undefined;
	export let onClick = undefined;
</script>

{#if to}
	<Link {to}>
		<button class:white>
			{#each message.split('') as letter}
				<span>{letter}</span>
			{/each}
		</button>
	</Link>
{:else}
	<button class:white on:click={onClick}>
		{#each message.split('') as letter}
			<span>{letter}</span>
		{/each}
	</button>
{/if}

<style>
	button.white {
		background-color: white;
	}

	button.white span {
		color: black;
	}

	button span {
		display: inline-block;
		margin: 0 3px;
		transition: all 0.1s ease;
	}

	button span:nth-child(even) {
		transform: translateY(-3px);
	}

	button span:nth-child(odd) {
		transform: translateY(3px);
	}

	button:hover span:nth-child(even) {
		transform: translateY(3px) rotate(10deg) scale(1.1);
	}

	button:hover span:nth-child(odd) {
		transform: translateY(-3px) rotate(-10deg) scale(0.9);
	}

	button {
		background-color: black;
		border: none;
		padding: 1rem;
		font-family: 'Earwig Factory';
		font-size: 2rem;
		transform: skew(3deg, 3deg);
		transition: all 0.1s ease;
		cursor: pointer;
	}

	button:hover {
		transform: skew(-3deg, -3deg);
	}
</style>
