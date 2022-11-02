<script>
  import { fly } from 'svelte/transition';
  import GoBack from '../lib/GoBack.svelte';
  import Input from '../lib/Input.svelte';
  import Button from '../lib/Button.svelte';
</script>

<div class="container" in:fly="{{duration: 300, y: 200}}">
  <GoBack />

  <h1>Sign in</h1>

  <Input />
  <Input reverse />

  <div class="btn">
    <Button message="Create Account" onClick={() => alert("abueno")} />
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  h1 {
    font-size: 4rem;
    margin-top: 2rem;
    margin-bottom: 4rem;
  }

  .btn {
    margin-top: 2rem;
  }
</style>
