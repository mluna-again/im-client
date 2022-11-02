<script>
	export let reverse = false;
	export let password = false;
	export let onChange = undefined;
	export let validate = undefined;
	export let placeholder = '';

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

<div class="container" class:reverse>
	<span class="placeholder">{placeholder}</span>
	<input type={password ? 'password' : 'text'} on:input={changeHandler} />
	{#if error}
		<span class="err">{error}</span>
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
</style>
