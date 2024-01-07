<script>
  import { LoggedIn, LoggedOut, FeaturedMaterials, YourMaterials } from '$lib';
</script>

<h1 class="h1">Welcome to your Dashboard</h1>
<LoggedIn let:user>
  You are logged in as {user?.email}
</LoggedIn>

<LoggedOut>
  Hello Guest! If you wish to register go to <a href="/">Home</a> page"
</LoggedOut>

<FeaturedMaterials />

<LoggedIn>
  <YourMaterials />
</LoggedIn>
