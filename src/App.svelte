<script>
	import { onDestroy } from 'svelte';
	import { Router, Route, navigate } from 'svelte-routing';
	import Home from './routes/Home.svelte';
	import SignIn from './routes/SignIn.svelte';
	import Login from './routes/Login.svelte';
	import Room from './routes/Room.svelte';
	import ChatApp from './routes/ChatApp.svelte';
	import { disconnectSocket as disconnectMessagesSocket } from './channels/messages.js';
	import { disconnectSocket as disconnectRequestsSocket } from './channels/requests.js';
	import { user } from './store.js';

	onDestroy(() => {
		disconnectMessagesSocket();
		disconnectRequestsSocket();
	});

	const checkIfUserIsLogged = async () => {
		const serverUrl = `${import.meta.env.VITE_SERVER_URL}/users/logged`;
		const response = await fetch(serverUrl, { credentials: 'include' });
		if (!response.ok) {
			return;
		}

		const data = await response.json();
		user.set(data);
    if (window.location.href.split("/").includes("app")) {
      return;
    }
		navigate('/app', { replace: true });
	};
	checkIfUserIsLogged();
</script>

<main>
	<Router>
		<Route path="/"><Home /></Route>
		<Route path="/app"><ChatApp /></Route>
		<Route path="/app/:friend" let:params
			><Room username={params.friend} /></Route
		>
		<Route path="/log-in"><Login /></Route>
		<Route path="/sign-in"><SignIn /></Route>
	</Router>
</main>

<style>
	main {
		height: 100%;
	}
</style>
