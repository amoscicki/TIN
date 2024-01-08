<script>
  import { LoggedIn, LoggedOut, FeaturedMaterials, YourMaterials } from '$lib';
</script>

<div class="grid grid-cols-12">
  <div class="grid-spacer" />

  <h1 class="text-center h1 col-span-full">Welcome to your Dashboard</h1>
  <div class="grid-spacer !h-6" />
  <div class="text-center col-span-full">
    <LoggedIn let:user>
      You are logged in as <span class="p-4 variant-outline card"
        >{user?.email}</span
      >
    </LoggedIn>

    <LoggedOut>
      Hello Guest! If you wish to register go to
      <a class="m-4 btn variant-ghost-primary" href="/">Home</a> page
    </LoggedOut>
  </div>
  <div class="grid-spacer" />
  <div class="col-start-3 col-end-10 text-center">
    <FeaturedMaterials />
  </div>

  <div class="grid-spacer" />

  <div class="col-start-3 col-end-10 text-center">
    <LoggedIn>
      <YourMaterials />
    </LoggedIn>
  </div>
</div>

<style lang="postcss">
  .grid-spacer {
    @apply col-span-full h-12;
  }
</style>
