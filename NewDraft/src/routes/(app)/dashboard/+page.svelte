<script>
  import { t } from '$lib/translations';
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
      {$t('lang.loggedInAs')}
      <span class="text">{user?.email}</span>
    </LoggedIn>
    <LoggedOut>
      {$t('lang.AsGuest')}
      <a class="m-4 btn variant-filled-primary" href="/?t=login"
        >{$t('lang.login')}</a
      >
      {$t('lang.or')}
      <a class="m-4 btn variant-filled-primary" href="/?t=register"
        >{$t('lang.register')}</a
      >
    </LoggedOut>
  </h2>

  {#await data.featured}
    <MaterialCard setVariant={'variant-soft-warning'}>
      <LoadingSpinner />
    </MaterialCard>
  {:then featured}
    <FeaturedMaterials materials={featured} />
  {:catch error}
    {$t('lang.errorLoadingFeaturedMaterials')}
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
      {$t('lang.errorLoadingOwnedMaterials')}
      <pre class="p-4 m-4 card variant-glass-secondary">{JSON.stringify(
          error,
          null,
          2
        )}</pre>
    {/await}
  </LoggedIn>
</div>
