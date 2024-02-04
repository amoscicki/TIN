<script>
  import { t } from '$lib/translations';
  import {
    DownloadButton,
    GenresCard,
    MaterialCard,
    TitleDescription,
    LoadingSpinner
  } from '$lib';
  import { Paginator } from '@skeletonlabs/skeleton';
  import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { ImageLoader } from '$lib';

  let innerWidth;

  const adjustLimit = () => {
    const limit = evaluateLimit();
    console.log(innerWidth);

    if (!materialsPaginationSettings) return;

    materialsPaginationSettings.limit = limit;
    materialsPaginationSettings.amounts = [limit];
  };

  const evaluateLimit = () => {
    if (innerWidth < 770) return 1;
    if (innerWidth < 1030) return 2;
    if (innerWidth < 1310) return 3;
    if (innerWidth < 1536) return 4;
    return 5;
  };

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

  $: if (innerWidth > 0) adjustLimit();

  $: paginatedMaterials = materials?.slice(
    materialsPaginationSettings.page * materialsPaginationSettings.limit,
    materialsPaginationSettings.page * materialsPaginationSettings.limit +
      materialsPaginationSettings.limit
  );

  $: materialsPaginationSettings.size = materials?.length || 0;
</script>

<svelte:window bind:innerWidth />
<div class="max-md:[&>*]:!grid max-md:[&>*]:!place-items-center">
  <h2 class="md:pl-10 m-4 h2">
    <div
      class="flex max-md:items-center max-md:flex-col max-md:flex-wrap justify-between md:w-11/12"
    >
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

  <div class="flex overflow-x-clip">
    {#if loading}
      {#each [1, 2, 3] as i}
        <MaterialCard
          setVariant={'variant-soft-warning grid place-items-center'}
        >
          <LoadingSpinner />
        </MaterialCard>
      {/each}
    {:else}
      {#each paginatedMaterials as material (material.materialId)}
        <!-- <pre class="card m-4 p-4 variant-glass-secondary">{JSON.stringify(
            material,
            null,
            2
          )}</pre> -->
        <div transition:slide={{ duration: 300, easing: quintOut, axis: 'x' }}>
          <a
            href={`/flashcard/${material.materialId}?q=0`}
            class="btn [&_img]:hover:opacity-75 [&_p]:hover:backdrop-brightness-0 [&_p]:hover:backdrop-blur-xl"
          >
            <MaterialCard setVariant={1} let:variant>
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
              </svelte:fragment>
            </MaterialCard>
          </a>
        </div>
      {:else}
        <MaterialCard
          setVariant={'variant-ghost-tertiary grid place-items-center'}
        >
          <h2 class="text-3xl -rotate-45 prose-h2:h2">
            {$t('lang.noMaterials')}
          </h2>
        </MaterialCard>
      {/each}
    {/if}
  </div>
</div>

<style>
</style>
