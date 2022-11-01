<script>
  import { fly } from 'svelte/transition';
  import GoBack from '../lib/GoBack.svelte';
</script>

<div class="container" in:fly="{{duration: 300, y: 200}}">
  <GoBack />

  <h1>Sign in</h1>
</div>

<style>
  .container {
    display: flex;
    justify-content: center;
    position: relative;
  }

  h1 {
    font-size: 4rem;
    margin-top: 2rem;
  }
</style>
