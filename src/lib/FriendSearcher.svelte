<script>
  import debounce from 'lodash.debounce';
	import Input from './Input.svelte';
	import UserCard from './UserCard.svelte';

	let userList = [];

  let query = "";
  const fetchUsers = async () => {
    const serverUrl = `${import.meta.env.VITE_SERVER_URL}/users?` + new URLSearchParams({
      search: query,
      limit: 10
    });

    const response = await fetch(serverUrl, { credentials: 'include'});
    const data = await response.json();
    userList = data;
  };

  $: debouncedFetch = debounce(fetchUsers, 500);
  const changeHandler = q => {
    query = q;
    debouncedFetch();
  }

  fetchUsers();
</script>

<div>
	<Input placeholder="Search friends" onChange={changeHandler} />

	{#each userList as user}
		<UserCard {user} />
	{/each}
</div>
