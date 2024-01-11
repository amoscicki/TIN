<script>
  import {
    LoadingSpinner,
    MaterialCard,
    LoggedIn,
    LoggedOut,
    FeaturedMaterials,
    YourMaterials
  } from '$lib';
  export let data;
</script>

<div class="">
  <h2 class="prose-h2:h2">
    <LoggedIn let:user>
      You are logged in as <span class="text">{user?.email}</span>
    </LoggedIn>
    <LoggedOut>
      Hello Guest! In order to create and manage your own materials you need to
      <a class="m-4 btn variant-filled-primary" href="/?t=login">login</a>
      or
      <a class="m-4 btn variant-filled-primary" href="/?t=register">register</a>
    </LoggedOut>
  </h2>

  {#await data.featured}
    <MaterialCard setVariant={'variant-soft-warning'}>
      <LoadingSpinner />
    </MaterialCard>
  {:then featured}
    <FeaturedMaterials materials={featured} />
  {:catch error}
    Error loading featured materials...
    <pre class="p-4 m-4 card variant-glass-secondary">{JSON.stringify(
        error,
        null,
        2
      )}</pre>
  {/await}
  <LoggedIn>
    {#await data.owned}
      <MaterialCard setVariant={'variant-soft-warning'}>
        <LoadingSpinner />
      </MaterialCard>
    {:then owned}
      <YourMaterials materials={owned} />
    {:catch error}
      Error loading owned materials...
      <pre class="p-4 m-4 card variant-glass-secondary">{JSON.stringify(
          error,
          null,
          2
        )}</pre>
    {/await}
  </LoggedIn>
</div>
