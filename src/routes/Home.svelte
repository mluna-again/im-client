<script>
  import Button from '../lib/Button.svelte'
</script>

<div class="container">
  <h1>Welcome to IM!</h1>

  <div class="btn">
    <Button message={"Create Room"} to="/new" />
  </div>

  <div class="btn">
    <Button message={"Access Existing Room"} to="/room" />
  </div>
</div>

<style>
  .container {
    height: 100%;
    width: 100%;
    display: flex;
    padding-top: 3rem;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    font-size: 4rem;
    margin-bottom: 3rem;
  }

  .btn {
    margin: 10px 0;
  }
</style>
