<script>
	import { navigate } from 'svelte-routing';
	import { disconnectSocket as disconnectRequests } from '../channels/requests.js';
	import { disconnectSocket as disconnectMessages } from '../channels/messages.js';

	const logoutHandler = async () => {
		const serverUrl = `${import.meta.env.VITE_SERVER_URL}/log-out`;
		await fetch(serverUrl, {
			method: 'DELETE',
			credentials: 'include',
		});

		window.localStorage.removeItem('t');
		navigate('/', { replace: true });

		disconnectRequests();
		disconnectMessages();
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
