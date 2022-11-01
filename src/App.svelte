<script>
  import { Router, Route } from "svelte-routing";
  import Home from './routes/Home.svelte'
  import SignIn from './routes/SignIn.svelte'
  import Login from './routes/Login.svelte'
</script>

<main>
  <Router>
    <Route path="/"><Home /></Route>
    <Route path="/log-in"><Login /></Route>
    <Route path="/sign-in"><SignIn /></Route>
  </Router>
</main>
