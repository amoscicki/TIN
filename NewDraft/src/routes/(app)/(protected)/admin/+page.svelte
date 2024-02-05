<script>
  import { t } from '$lib/translations';
  import {
    toaster,
    LoadingSpinner,
    MaterialCard,
    DownloadButton,
    GenresCard,
    TitleDescription
  } from '$lib';
  import { enhance } from '$app/forms';
  import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { Paginator, getToastStore } from '@skeletonlabs/skeleton';
  export let data;

  const popToast = toaster(getToastStore());

  const enhanceHandler = () => {
    cache = [...cache];

    return async ({ result }) => {
      console.log('enhanceHandler', result);
      if (200 !== result?.status && result?.data?.errors) {
        for (const [key, value] of Object.entries(result.data)) {
          if ('errors' === key) continue;
          if (value) popToast(key);
        }
        return;
      }

      if (result?.status === 200 && result?.data?.toastMessage) {
        popToast(result.data.toastMessage);

        const { public: newPublic, featured: newFeatured } =
          result.data.material;
        const material = cache.find(
          (m) => m.materialId === result.data.material.materialId
        );
        if (material) {
          material.public = newPublic;
          material.featured = newFeatured;
          delete material.overlay;
        }
        console.log('material', material);
        const newCache = cache.filter(
          (m) => m.materialId !== result.data.materialId
        );
        cache = [...newCache, material];
      }
    };
  };

  const selectCardVariant = (featured) => {
    return featured ? 1 : 'variant-glass';
  };

  let cache = [];

  let loading = true;

  let materialsPaginationSettings = {
    page: 0,
    limit: 3,
    size: 0,
    amounts: [3]
  };

  export const snapshot = {
    capture: () => cache,
    restore: (data) => {
      cache = data;
    }
  };

  const cacheData = async () => {
    Promise.resolve(data.materials).then((materials) => {
      cache = materials;
      materialsPaginationSettings.size = materials.length;
      loading = false;
    });
  };

  cacheData();

  $: paginatedMaterials = cache.slice(
    materialsPaginationSettings.page * materialsPaginationSettings.limit,
    materialsPaginationSettings.page * materialsPaginationSettings.limit +
      materialsPaginationSettings.limit
  );

  $: if (cache.length > 0)
    cache.forEach((item) => {
      item.setVariant = selectCardVariant(item.featured);
    });
</script>

<div class="grid grid-cols-2 grid-flow-dense">
  <div class="col-span-2">
    <h2 class="pl-10 m-4 h2">
      <div class="flex justify-between">
        {$t('lang.materials')}
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
    <div class="flex flex-wrap justify-between">
      {#if loading}
        {#each [1, 2, 3, 4] as i}
          <MaterialCard
            setVariant={'variant-soft-warning grid place-items-center'}
          >
            <LoadingSpinner />
          </MaterialCard>
        {/each}
      {:else}
        {#each paginatedMaterials as material, i (i)}
          <MaterialCard
            setVariant={selectCardVariant(material.featured)}
            let:variant
          >
            {#if material.overlay}
              <div
                class="absolute z-30 grid opacity-50 -inset-2 card variant-glass-surface place-items-center"
              >
                <LoadingSpinner />
              </div>
            {/if}
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
                { label: 'Description', content: material.description },
                { label: 'Owner', content: material.User.email }
              ]}
              slot="lead"
            />
            <svelte:fragment let:variant slot="footer">
              <!-- From here do the component  -->
              <form
                use:enhance={enhanceHandler}
                action="/api/materials?/update"
                method="POST"
                class="flex justify-between col-span-2"
              >
                <input
                  type="hidden"
                  id="materialId"
                  name="materialId"
                  value={material.materialId}
                />
                <label
                  class="flex items-center w-full gap-4 text-xl cursor-pointer backdrop-blur-lg"
                >
                  <input
                    class="checkbox"
                    type="checkbox"
                    name="public"
                    id="public"
                    checked={material.public}
                    on:change|preventDefault={({ target }) => {
                      target.form.requestSubmit();
                      cache.find(
                        (m) => m.materialId === material.materialId
                      ).overlay = true;
                    }}
                  />
                  {$t('lang.public')}
                </label>
                <label
                  class="flex items-center w-full gap-4 text-xl cursor-pointer backdrop-blur-lg"
                >
                  <input
                    class="checkbox"
                    type="checkbox"
                    name="featured"
                    id="featured"
                    checked={material.featured}
                    disabled={!material.public}
                    on:change|preventDefault={(e) => {
                      e.target.form.requestSubmit();
                      cache.find(
                        (m) => m.materialId === material.materialId
                      ).overlay = true;
                    }}
                  />
                  {$t('lang.featured')}
                </label>
              </form>
              <!-- To here -->
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
  <div>
    <h2 class="pl-10 m-4 h2">
      {$t('lang.genres')}
    </h2>
    {#await data.genres}
      <LoadingSpinner />
    {:then genres}
      {#each genres as genre (genre.genreId)}
        <div
          class="flex justify-between gap-4 p-4 m-4 card"
          transition:slide={{ duration: 500, easing: quintOut }}
        >
          <span>{genre.name}</span>
          <form use:enhance action="?/removeGenre" method="post">
            <input
              type="hidden"
              name="genreId"
              id="genreId"
              value={genre.genreId}
            />
            <button
              class="rounded-full chip variant-filled-primary"
              type="submit"
            >
              <i class="fa-solid fa-x"></i>
            </button>
          </form>
        </div>
      {/each}
      <form use:enhance action="?/addGenre" class="px-4" method="POST">
        <div class="input-group input-group-divider grid-cols-[1fr_auto]">
          <input class="input" type="text" name="name" id="name" />
          <button class="variant-filled-success">
            <i class="fa fa-plus-circle" />
          </button>
        </div>
      </form>
    {/await}
  </div>
  <div>
    <h2 class="pl-10 m-4 h2">
      {$t('lang.users')}
    </h2>
    {#await data.users}
      <LoadingSpinner />
    {:then users}
      {#each users as user}
        <div class="flex justify-between gap-4 p-4 m-4 card">
          <p>{user.email}</p>
          <p>{user.role}</p>
        </div>
      {/each}
    {/await}
  </div>
  <div>
    <h2 class="pl-10 m-4 h2">
      {$t('lang.roles')}
    </h2>
    {#await data.roles}
      <LoadingSpinner />
    {:then roles}
      {#each roles as role}
        <div class="flex justify-between gap-4 p-4 m-4 card">
          <p>{role.name}</p>
        </div>
      {/each}
    {/await}
  </div>
</div>
