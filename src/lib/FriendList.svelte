<script>
  export let user;

  $: console.log(user.friends)
</script>

<div class="container">
  {#each user?.friends as friend}
    <p>
      {friend.username}
    </p>
  {/each}
</div>

<style>
  .container {
    margin-top: 2rem;
  }
</style>
