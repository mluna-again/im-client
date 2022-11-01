<script>
  import Button from './lib/Button.svelte'
</script>

<main>
  <h1>Welcome to IM!</h1>

  <div class="btn">
    <Button class="btn" message={"Create Room"} />
  </div>

  <div class="btn">
    <Button class="btn" message={"Access Existing Room"} />
  </div>
</main>

<style>
  main {
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
