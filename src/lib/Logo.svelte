<div class="container">
	<div class="letter">
		<h1>I</h1>
	</div>

	<div class="letter">
		<h1>M</h1>
	</div>
</div>

<style>
	.container {
		display: flex;
		padding: 0;
		margin: 10px;
	}

	.letter:first-of-type h1 {
		color: #cc0102;
	}

	.letter h1 {
		font-size: 5rem;
		display: inline-block;
		padding: 0;
		margin: 0;
	}

	@media (max-width: 800px) {
		.letter h1 {
			font-size: 3.5rem;
		}
	}

	.letter {
		margin: 0 1px;
		background-color: black;
		width: min-content;
		display: flex;
		height: 5.1rem;
		align-items: center;
		transform: skew(5deg) rotate(-5deg);
	}
</style>
