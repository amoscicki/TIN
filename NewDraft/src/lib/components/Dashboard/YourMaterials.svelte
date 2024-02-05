<script>
  import { invalidateAll } from '$app/navigation';
  import { t } from '$lib/translations';
  import {
    toaster,
    MaterialCard,
    DownloadButton,
    GenresCard,
    LoadingSpinner,
    LoggedIn,
    TitleDescription
  } from '$lib';
  import { getToastStore, Paginator } from '@skeletonlabs/skeleton';
  import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { enhance, applyAction } from '$app/forms';
  import { ImageLoader } from '$lib';
  import { onMount } from 'svelte';

  const adjustLimit = () => {
    const limit = evaluateLimit();

    if (!materialsPaginationSettings) return;

    materialsPaginationSettings.limit = limit;
    materialsPaginationSettings.amounts = [limit];
  };

  let innerWidth;

  const evaluateLimit = () => {
    if (innerWidth < 770) return 1;
    if (innerWidth < 1030) return 1;
    if (innerWidth < 1310) return 2;
    if (innerWidth < 1536) return 3;
    return 3;
  };

  $: if (innerWidth > 0) adjustLimit();

  export let materials;
  export let loading;
  let paginatedMaterials = [];
  let materialsPaginationSettings = {
    page: 0,
    limit: evaluateLimit(),
    size: 0,
    amounts: [evaluateLimit()]
  };
  let refetch;
  let paginatedOwnMaterials = [];

  const popToast = toaster(getToastStore());

  const enhanceHandler = () => {
    return async ({ result }) => {
      if (400 === result?.status && result?.data?.errors) {
        for (const [key, value] of Object.entries(result.data)) {
          if ('errors' === key) continue;
          if (value) popToast(key);
        }
        return;
      }

      if (result?.status === 200 && result?.data?.toastMessage)
        popToast(result.data.toastMessage);
      invalidateAll();
      await applyAction(result);
    };
  };

  $: paginatedOwnMaterials = materials?.slice(
    materialsPaginationSettings.page * materialsPaginationSettings.limit,
    materialsPaginationSettings.page * materialsPaginationSettings.limit +
      materialsPaginationSettings.limit
  );

  $: materialsPaginationSettings.size = materials?.length || 0;

  $: !!refetch && refetch();
</script>

<svelte:window bind:innerWidth />
<LoggedIn bind:refetch />
<div class="max-md:[&>*]:!grid max-md:[&>*]:!place-items-center">
  <h2 class="md:pl-10 m-4 h2">
    <div
      class="flex max-md:flex-col max-md:items-center max-md:flex-wrap justify-between md:w-11/12"
    >
      {$t('lang.yourMaterials')}
      <Paginator
        bind:settings={materialsPaginationSettings}
        select="hidden"
        showNumerals={true}
        maxNumerals={3}
        controlVariant="variant-ringed border-2"
      />
    </div>
  </h2>
  <div
    class="flex overflow-x-clip {window.innerWidth < 768
      ? 'flex-wrap-reverse'
      : ''}"
  >
    <a href="/new" class="btn">
      <MaterialCard setVariant={'variant-ghost-warning'}>
        <TitleDescription title={$t('lang.add')} slot="lead" />
        <i class="w-full text-center fas fa-plus-circle fa-5x" />
      </MaterialCard>
    </a>
    {#if loading}
      {#each [1, 2] as i}
        <MaterialCard
          setVariant={'variant-soft-warning grid place-items-center'}
        >
          <LoadingSpinner />
        </MaterialCard>
      {/each}
    {:else}
      {#each paginatedOwnMaterials as material (material.materialId)}
        <div
          class="relative"
          transition:slide={{ duration: 300, easing: quintOut, axis: 'x' }}
        >
          <div class="absolute right-0 z-20 flex justify-end w-5/12 gap-2 p-10">
            <a
              class="w-12 top-4 right-20 aspect-square btn variant-filled-warning"
              href="/edit/{material.materialId}"
            >
              <i class="fa fa-edit" />
            </a>
            <form
              use:enhance={enhanceHandler}
              action="/api/materials?/delete"
              method="post"
            >
              <input
                type="hidden"
                name="materialId"
                value={material.materialId}
              />
              <button
                class="w-12 aspect-square btn variant-filled-primary top-4 right-6"
                type="submit"
              >
                <i class="fa fa-trash" />
              </button>
            </form>
          </div>
          <a
            href={`/flashcard/${material.materialId}?q=0`}
            class="btn relative z-10 [&_img]:hover:opacity-75 [&_p]:hover:backdrop-brightness-0 [&_p]:hover:backdrop-opacity-50"
          >
            <MaterialCard setVariant={0}>
              <svelte:fragment slot="image">
                {#if material.imageName}
                  <ImageLoader
                    src={`data:${material.imageType};base64,${material.image}`}
                    alt={material.imageName}
                    type={material.imageType}
                    b64={material.image}
                    class="opacity-20"
                  />
                {/if}
              </svelte:fragment>
              <TitleDescription
                title={material.title}
                labels={true}
                descriptors={[
                  { label: 'Description', content: material.description }
                ]}
                slot="lead"
              />
              <svelte:fragment let:variant slot="footer">
                <GenresCard {variant} genres={material.genres} />
                <DownloadButton
                  source={{
                    name: material.sourceName,
                    data: material.source,
                    type: material.sourceType
                  }}
                />
                <div
                  class="grid justify-between w-full grid-cols-2 gap-4 mb-0 ml-auto mr-0 card variant-soft"
                ></div>
              </svelte:fragment>
            </MaterialCard>
          </a>
        </div>
      {/each}
    {/if}
  </div>
</div>

<style>
</style>
