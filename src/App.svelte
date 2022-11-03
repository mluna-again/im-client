<script>
	import { Router, Route } from 'svelte-routing';
	import Home from './routes/Home.svelte';
	import SignIn from './routes/SignIn.svelte';
	import Login from './routes/Login.svelte';
	import Room from './routes/Room.svelte';
	import ChatApp from './routes/ChatApp.svelte';
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
