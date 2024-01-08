<script>
  import { LoggedIn, LoggedOut, FeaturedMaterials, YourMaterials } from '$lib';
  export let data;
  $: featured = data?.body?.featured ?? [];
  $: owned = data?.body?.owned ?? [];
</script>

<div class="spacer" />

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
<div class="spacer" />
<div class="text-center col-span-full">
  <FeaturedMaterials materials={featured} />
</div>

<div class="spacer" />

<div class="text-center col-span-full">
  <LoggedIn>
    <YourMaterials materials={owned} />
  </LoggedIn>
</div>

<style lang="postcss">
  .spacer {
    @apply h-12;
  }
</style>
