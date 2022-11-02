<script>
  import { fly } from 'svelte/transition';
  import GoBack from '../lib/GoBack.svelte';
  import Input from '../lib/Input.svelte';
  import Button from '../lib/Button.svelte';

  let username = "";
  let password = "";
  const setUsername = text => username = text;
  const setPassword = text => password = text;

  const validateUsername = (username) => {
    if (username.length < 4) return "too short";
    if (username.length > 15) return "too long";

    return null;
  };

  const validatePassword = (password) => {
    if (password.length < 6) return "too short";
    if (password.length > 72) return "too long";

    return null;
  };

  let error = null;
  const submitHandler = () => {
    if (!username || !password) {
      error = "please check your data";
      return;
    }

    console.log({password, username});
    error = null;
  };
</script>

<div class="container" in:fly="{{duration: 300, y: 200}}">
  <GoBack />

  <h1>Sign in</h1>

  <Input value={username} onChange={setUsername} validate={validateUsername} />
  <Input value={password} onChange={setPassword} validate={validatePassword} reverse password />

  <div class="btn">
    <Button message="Create Account" onClick={submitHandler} />
  </div>

  {#if error}
    <p class="err">{error}</p>
  {/if}
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

  .err {
    margin-top: 2rem;
    font-size: 3rem;
  }
</style>
