<script>
  import { Router, Route } from "svelte-routing";
  import Home from './routes/Home.svelte'
  import NewRoom from './routes/NewRoom.svelte'
  import Room from './routes/Room.svelte'
</script>

<main>
  <Router>
    <Route path="/"><Home /></Route>
    <Route path="/new"><NewRoom /></Route>
    <Route path="/:roomID"><Room /></Route>
  </Router>
</main>
