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
  let loading = {
    featured: true,
    owned: true
  };

  let owned;
  let featured;

  $: Promise.resolve(data?.owned).then((res) => {
    loading.owned = false;
    res.sort((a, b) => a.materialId - b.materialId);
    owned = res;
  });
  $: Promise.resolve(data?.featured).then((res) => {
    loading.featured = false;
    res.sort((a, b) => a.materialId - b.materialId);
    featured = res;
  });
</script>

<h2 class="pl-10 m-4 prose-h2:h2">
  <LoggedIn dbglbl="dashboard" let:user>
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

<FeaturedMaterials loading={loading.featured} materials={featured} />

<LoggedIn>
  <YourMaterials loading={loading.owned} materials={owned} />
</LoggedIn>
