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

  let owned = [];
  let featured = [];

  $: Promise.resolve(data?.owned).then((res) => (owned = res));
  $: Promise.resolve(data?.featured).then((res) => (featured = res));
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

  {#if featured.length === 0}
    <MaterialCard setVariant={'variant-soft-warning grid place-items-center'}>
      <LoadingSpinner />
    </MaterialCard>
  {/if}
  <FeaturedMaterials materials={featured} />

  <LoggedIn>
    {#if owned.length === 0}
      <MaterialCard setVariant={'variant-soft-warning grid place-items-center'}>
        <LoadingSpinner />
      </MaterialCard>
    {/if}
    <YourMaterials materials={owned} />
  </LoggedIn>
</div>
