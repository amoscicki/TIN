<script>
  import {
    LoadingSpinner,
    MaterialCard,
    DownloadButton,
    GenresCard,
    TitleDescription
  } from '$lib';
  import { invalidateAll } from '$app/navigation';
  import { enhance, applyAction } from '$app/forms';
  import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  export let data;
  export let form;

  const enhanceHandler = () => {
    return async ({ result }) => {
      await applyAction(result);
      await invalidateAll();
    };
  };

  let cache;

  export const snapshot = {
    capture: () => cache,
    restore: (data) => {
      cache = data;
    }
  };

  const cacheData = async () => {
    Promise.resolve(data.materials).then((materials) => {
      console.log('form', form);
      cache = materials;
    });
  };

  $: cacheData();
  console.log(cache);
  console.log(undefined === cache);
  console.log(!cache);
  console.log(cache);

  $: console.log(cache);
  // TODO: Styling
  // TODO: Pagination
</script>

<h2 class="pl-10 m-4 h2">Materials</h2>
<div class="grid grid-cols-4">
  {#await data.materials}
    {#if undefined === cache || !cache || cache?.length === 0}
      <MaterialCard setVariant={1}>
        <LoadingSpinner />
      </MaterialCard>
    {:else}
      {#each cache as material, i (i)}
        <MaterialCard
          setVariant={material.featured ? 1 : 'variant-glass'}
          let:variant
        >
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
              { label: 'Owner', content: material.author }
            ]}
            slot="lead"
          />

          <svelte:fragment let:variant slot="footer">
            <!-- TODO: From here do the component -->
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
                  disabled
                />
                Public
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
                  disabled
                />
                Featured
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
      {/each}
    {/if}
  {:then materials}
    {#each materials as material, i (i)}
      <MaterialCard
        setVariant={material.featured ? 1 : 'variant-glass'}
        let:variant
      >
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
            { label: 'Owner', content: material.author }
          ]}
          slot="lead"
        />

        <svelte:fragment let:variant slot="footer">
          <!-- TODO: From here do the component -->
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
                on:change={(e) => {
                  e.target.form.requestSubmit();
                }}
              />
              Public
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
                on:change={(e) => {
                  e.target.form.requestSubmit();
                }}
              />
              Featured
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
    {/each}
  {/await}
</div>

<h2 class="pl-10 m-4 h2">Genres</h2>
{#await data.genres}
  <LoadingSpinner />
{:then genres}
  {#each genres as genre (genre.genreId)}
    <div
      class="flex justify-between gap-4 p-4 m-4 card"
      transition:slide={{ duration: 500, easing: quintOut, y: '100%' }}
    >
      <span>{genre.name}</span>
      <form use:enhance action="?/removeGenre" method="post">
        <input
          type="hidden"
          name="genreId"
          id="genreId"
          value={genre.genreId}
        />
        <button class="rounded-full chip variant-filled-primary" type="submit">
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

<h2 class="pl-10 m-4 h2">Users</h2>
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

<h2 class="pl-10 m-4 h2">Roles</h2>
{#await data.roles}
  <LoadingSpinner />
{:then roles}
  {#each roles as role}
    <div class="flex justify-between gap-4 p-4 m-4 card">
      <p>{role.name}</p>
    </div>
  {/each}
{/await}
