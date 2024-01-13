<script>
  import { t } from '$lib/translations';
  import {
    DownloadButton,
    GenresCard,
    MaterialCard,
    TitleDescription
  } from '$lib';
  import { Paginator } from '@skeletonlabs/skeleton';
  import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  export let materials;

  let paginatedMaterials = [];

  let materialsPaginationSettings = {
    page: 0,
    limit: 4,
    size: 0,
    amounts: [4]
  };
  $: paginatedMaterials = materials.slice(
    materialsPaginationSettings.page * materialsPaginationSettings.limit,
    materialsPaginationSettings.page * materialsPaginationSettings.limit +
      materialsPaginationSettings.limit
  );

  $: materialsPaginationSettings.size = materials.length;
</script>

<h2 class="pl-10 m-4 h2">
  <div class="flex justify-between w-11/12">
    {$t('lang.featuredMaterials')}
    {#if materialsPaginationSettings.size > 0}
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
    <div transition:slide={{ duration: 300, easing: quintOut, axis: 'x' }}>
      <a
        href={`/flashcard/${material.materialId}?q=0`}
        class="btn [&_img]:hover:opacity-75 [&_p]:hover:backdrop-brightness-0 [&_p]:hover:backdrop-blur-xl"
      >
        <MaterialCard setVariant={1} let:variant>
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
          </svelte:fragment>
        </MaterialCard>
      </a>
    </div>
  {/each}
</div>

<style>
</style>
