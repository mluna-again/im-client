<script>
	import { fly } from 'svelte/transition';
	import { ICONS } from '../icons.js';
	import GoBack from '../lib/GoBack.svelte';
	import { user } from '../store.js';
	import { updateUser } from '../http/user.js';

	const setIconHandler = async (icon) => {
		await updateUser($user, { icon });
		user.update((user) => {
			return { ...user, icon };
		});
	};
</script>

<div
	class="container"
	in:fly={{ y: 300, duration: 300, delay: 200 }}
	out:fly={{ y: 300, duration: 300 }}
>
	<GoBack to="/app" />
	<h1>Settings</h1>

	<div class="icons">
		<ul>
			{#each Object.entries(ICONS) as [name, displayName]}
				<li class:selected={$user?.icon === name}>
					<button on:click={() => setIconHandler(name)}>
						<img src="/icons/{name}.png" alt={displayName} />
						<span>{displayName}</span>
					</button>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	.container {
		margin-top: 3rem;
	}

	.container h1 {
		text-align: center;
		font-size: 3rem;
	}

	.icons ul {
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin-top: 4rem;
	}

	ul li {
		flex-basis: 20%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 2rem;
	}

	li button {
		cursor: pointer;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border: none;
		background: none;
		font-family: 'Earwig Factory', cursive;
	}

	li span {
		font-size: 2rem;
		text-align: center;
	}

	li.selected span {
		color: black;
	}

	li img {
		height: 80px;
		width: 80px;
		padding: 3px;
		transform: skew(10deg);
		transition: all 0.3s ease;
	}

	li.selected img {
		background-color: black;
		border: 4px solid white;
	}

	li:hover img {
		border: 4px solid white;
		transform: skew(0deg);
	}
</style>
