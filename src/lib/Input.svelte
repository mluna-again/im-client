<script>
	export let reverse = false;
	export let password = false;
	export let onChange = undefined;
	export let validate = undefined;
	export let placeholder = '';
	export let noMotion = false;

	let error = null;

	const changeHandler = (event) => {
		const text = event.target.value;
		const validationError = validate && validate(text);
		if (validationError) {
			onChange('');
			error = validationError;
			return;
		}

		error = null;
		onChange(text);
	};
</script>

<div class="container" class:reverse class:noMotion>
	<span class="placeholder">{placeholder}</span>
	<input type={password ? 'password' : 'text'} on:input={changeHandler} />
	{#if error}
		<span class="err">{error}</span>
	{/if}

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
	.err {
		color: black;
	}

	.reverse .err {
		color: white;
	}

	.container.reverse {
		background-color: black;
		transform: skew(-20deg);
	}

	.container.reverse input {
		background-color: white;
		transform: skew(20deg);
		color: black;
	}

	.container {
		position: relative;
		margin: 25px 0;
		background-color: white;
		padding: 15px;
		transform: skew(20deg);
		transition: all 0.1s ease;
	}

	.container:hover {
		transform: skew(20deg) rotate(2deg);
	}

	.container.reverse:hover {
		transform: skew(-20deg) rotate(2deg);
	}

	.container.reverse.noMotion:hover,
	.container.noMotion:hover {
		transform: skew(20deg);
	}

	input {
		height: 35px;
		width: 100%;
		background-color: black;
		border: none;
		transform: skew(-20deg);
		color: white;
		text-align: center;
		font-family: 'Poor Story', cursive;
		font-size: 2rem;
	}

	input:focus {
		outline: none;
	}

	.placeholder {
		position: absolute;
		top: -20%;
		left: -5%;
		background-color: black;
		color: white;
	}

	.reverse .placeholder {
		background-color: white;
		color: black;
	}

	.tail {
		width: 40px;
		height: 30px;
		position: absolute;
		bottom: 0;
		right: -35px;
		fill: white;
		stroke: white;
	}

	.tail.reverse {
		left: -35px;
		fill: black;
		stroke: black;
	}
</style>
