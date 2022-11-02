<script>
	import { navigate } from 'svelte-routing';

  const logoutHandler = async () => {
		const serverUrl = `${import.meta.env.VITE_SERVER_URL}/log-out`;
		await fetch(serverUrl, {
			method: 'DELETE',
      credentials: 'include'
		});

		navigate('/', { replace: true });
  };
</script>

<button on:click={logoutHandler}>LOG OUT</button>

<style>
	button {
		color: black;
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
