<script>
  export let reverse = false;
</script>

<div class="container" class:reverse>
  <input type="text">
</div>

<style>
  .container.reverse {
    background-color: black;
    transform: skew(-20deg);
  }

  .container.reverse input {
    background-color: white;
    transform: skew(20deg);
    color: black;
  }

  .container {
    margin: 10px 0;
    background-color: white;
    padding: 15px;
    transform: skew(20deg);
    transition: all 0.1s ease;
  }

  .container:hover {
    transform: skew(20deg) rotate(2deg);
  }

  .container.reverse:hover {
    transform: skew(-20deg) rotate(2deg);
  }

  input {
    height: 35px;
    width: min-content;
    background-color: black;
    border: none;
    transform: skew(-20deg);
    color: white;
    text-align: center;
    font-family: 'Poor Story', cursive;
    font-size: 2rem;
  }

  input:focus {
    outline: none;
  }
</style>
