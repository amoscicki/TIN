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

  const submitForm = async (e) => {
    const form = e.target.form;
    const formData = new FormData(form);
    const response = await fetch(form.action, {
      method: form.method,
      body: formData
    });
    const result = await response.json();
    await applyAction(result);
  };

  // TODO: Styling
  // TODO: Pagination
</script>

<h2 class="pl-10 m-4 h2">Materials</h2>
<div class="grid grid-cols-4">
  {#await data.materials}
    <MaterialCard setVariant={1}>
      <LoadingSpinner />
    </MaterialCard>
  {:then materials}
    {#each materials as material, i (i)}
      <MaterialCard setVariant={1} let:variant>
        <div slot="image">
          {#if material.imageName}
            <img
              src={`data:${material.imageType};base64,${material.image}`}
              alt={material.imageName}
              class="opacity-40"
            />
          {/if}
        </div>

        <TitleDescription
          title={material.title}
          labels={true}
          descriptors={[
            { label: 'Description', content: material.description }
          ]}
          slot="lead"
        />

        <svelte:fragment let:variant slot="footer">
          <!-- TODO: From here do the component -->
          <form
            use:enhance={enhanceHandler}
            action="/api/materials?/update"
            method="POST"
            on:submit|preventDefault
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
                on:change={submitForm}
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
                checked={materials[i].featured}
                disabled={!materials[i].public}
                on:change={submitForm}
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
      <div
        class="relative flex flex-col justify-start gap-4 p-4 m-4 card border-2 {materials[
          i
        ].featured
          ? 'border-secondary-500 variant-soft-secondary'
          : 'border-transparent variant-soft'}"
      >
        {#if material.imageName}
          <div class="absolute object-cover opacity-50 inset-6 -z-10">
            <img
              src={`data:${material.imageType};base64,${material.image}`}
              alt={material.imageName}
            />
          </div>
        {/if}

        <div
          class="grid grid-cols-[auto_1fr] gap-4 p-4 m-4 card variant-soft overflow-clip"
        >
          <span class="col-span-2 mb-4 h3"
            >Owner <br /> {material.User.email}</span
          >
          <span>Title:</span><span>{material.title}</span>
          <span> Description: </span>
          <span>{material.description}</span>

          <form
            use:enhance={enhanceHandler}
            action="/api/materials?/update"
            method="POST"
            on:submit|preventDefault
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
                on:change={submitForm}
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
                checked={materials[i].featured}
                disabled={!materials[i].public}
                on:change={submitForm}
              />
              Featured
            </label>
          </form>
        </div>
        {#if material.genres.length > 0}
          <div class="grid grid-cols-2 gap-4 p-4 m-4 card variant-soft">
            <h3 class="col-span-2 h3">Genres</h3>
            {#each material.genres as genre}
              <div class="text-center variant-soft-secondary rounded-3xl">
                {genre}
              </div>
            {/each}
          </div>
        {/if}
        {#if material.sourceName}
          <a
            class="flex items-center justify-center gap-4 btn variant-filled-primary"
            download={material.sourceName}
            href={`data:${material.sourceType};base64,${material.source}`}
          >
            <i class="fa fa-download" />
            Download Source File
          </a>
        {/if}
      </div>
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
