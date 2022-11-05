<script>
	export let content;
	export let reverse = false;
</script>

<div class:reverse>
	<span>{content}</span>
	{#if reverse}
		<svg
			class="tail"
			class:reverse
			viewBox="0 0 137 99"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				id="right"
				d="M52 93L8 44.5H45.5L88 4.5L133 28.5L124.5 80.5L88 44.5L52 93Z"
				stroke-width="7"
			/>
		</svg>
	{:else}
		<svg class="tail" viewBox="0 0 137 99" xmlns="http://www.w3.org/2000/svg">
			<path
				id="left"
				d="M85 6L129 54.5L91.5 54.5L49 94.5L4 70.5L12.5 18.5L49 54.5L85 6Z"
				stroke-width="7"
			/>
		</svg>
	{/if}
</div>

<style>
	div {
		margin-bottom: 1rem;
		background-color: black;
		color: white;
		font-size: 2rem;
		padding: 0.8rem 0 0.8rem 0.5rem;
		font-family: 'Poor Story', cursive;
		transform: skew(10deg);
		width: 50%;
		margin-right: auto;
		display: relative;
	}

	div.reverse {
		text-align: right;
		padding: 0.8rem 0.5rem 0.8rem 0;
		margin-right: 0;
		margin-left: auto;
		transform: skew(-10deg);
		background-color: white;
		color: black;
	}

	.tail {
		width: 40px;
		height: 30px;
		position: absolute;
		left: -35px;
		bottom: 0;
		fill: black;
		stroke: black;
		transform: rotate(180deg);
	}

	.tail.reverse {
		stroke: white;
		fill: white;
		right: -35px;
		left: unset;
	}

	@media (max-width: 1100px) {
		span {
			font-size: 1.7rem;
		}
	}

	@media (max-width: 800px) {
		span {
			font-size: 1.4rem;
		}
	}
	@media (max-width: 600px) {
		span {
			font-size: 1.2rem;
		}
	}
</style>
