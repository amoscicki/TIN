<script>
  import { invalidateAll } from '$app/navigation';
  import { t } from '$lib/translations';
  import {
    toaster,
    MaterialCard,
    DownloadButton,
    GenresCard,
    TitleDescription
  } from '$lib';
  import { getToastStore, Paginator } from '@skeletonlabs/skeleton';
  import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { enhance, applyAction } from '$app/forms';
  export let materials = [];

  let paginatedMaterials = [];

  let materialsPaginationSettings = {
    page: 0,
    limit: 3,
    size: materials.length,
    amounts: [3]
  };

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

  $: paginatedMaterials = materials.slice(
    materialsPaginationSettings.page * materialsPaginationSettings.limit,
    materialsPaginationSettings.page * materialsPaginationSettings.limit +
      materialsPaginationSettings.limit
  );
</script>

<h2 class="pl-10 m-4 h2">
  <div class="flex justify-between w-11/12">
    {$t('lang.yourMaterials')}
    {#if materialsPaginationSettings?.size > 0}
      <Paginator
        bind:settings={materialsPaginationSettings}
        select="hidden"
        showNumerals={true}
        maxNumerals={3}
        controlVariant="variant-ringed border-2"
      />
    {/if}
  </div>
</h2>
<div class="flex flex-wrap">
  {#each paginatedMaterials as material (material.materialId)}
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
          <input type="hidden" name="materialId" value={material.materialId} />
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
              <img
                src={`data:${material.imageType};base64,${material.image}`}
                alt={material.imageName}
                class="opacity-40"
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
  <a href="/new" class="btn">
    <MaterialCard setVariant={'variant-ghost-warning'}>
      <TitleDescription title={$t('lang.add')} slot="lead" />
      <i class="w-full text-center fas fa-plus-circle fa-5x" />
    </MaterialCard>
  </a>
</div>

<style>
</style>
