<script>
	import { onDestroy } from 'svelte';
	import { Router, Route, navigate } from 'svelte-routing';
	import Home from './routes/Home.svelte';
	import SignIn from './routes/SignIn.svelte';
	import Login from './routes/Login.svelte';
	import Room from './routes/Room.svelte';
	import ChatApp from './routes/ChatApp.svelte';
	import Settings from './routes/Settings.svelte';
	import NoConnectionMessage from './lib/NoConnectionMessage.svelte';
	import {
		disconnectSocket as disconnectMessagesSocket,
		maybeConnect as connectMessages,
	} from './channels/messages.js';
	import {
		disconnectSocket as disconnectRequestsSocket,
		maybeConnect as connectRequests,
	} from './channels/requests.js';
	import {
		user,
		requestsChannel,
		messagesChannel,
		disconnectionAlert,
	} from './store.js';

	user.subscribe((user) => {
		connectMessages(user, (channel) => {
			messagesChannel.set(channel);
		});

		connectRequests(user, (channel) => {
			requestsChannel.set(channel);
		});
	});

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
		if (window.location.href.split('/').includes('app')) {
			return;
		}
		navigate('/app', { replace: true });
	};
	checkIfUserIsLogged();
</script>

<main>
	{#if $disconnectionAlert.some(Boolean)}
		<NoConnectionMessage />
	{/if}
	<Router>
		<Route path="/"><Home /></Route>
		<Route path="/settings"><Settings /></Route>
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
