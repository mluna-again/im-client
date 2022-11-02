<script>
	import { Link } from 'svelte-routing';
	export let to = '/';
</script>

<Link {to}>
	<button>BACK</button>
</Link>

<style>
	button {
		position: absolute;
		top: 0;
		left: 0;
		color: white;
		background-color: transparent;
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
