<script>
  import { enhance, applyAction } from '$app/forms';
  import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  export let data;
  export let form;

  $: users = data?.body?.users ?? [];
  $: roles = data?.body?.roles ?? [];
  $: materials = data?.body?.materials ?? [];
  $: genres = data?.body?.genres ?? [];

  let isPublicForm;

  const enhanceHandler = () => {
    return async ({ result }) => {
      await applyAction(result);
    };
  };

  // TODO: Styling
</script>

<h2 class="pl-10 m-4 h2">Materials</h2>
<div class="grid grid-cols-4">
  {#each materials as material, i (i)}
    <div
      class="relative flex flex-col justify-start gap-4 p-4 m-4 card variant-soft border-2 border-transparent {materials[
        i
      ].featured
        ? '!border-secondary-500'
        : ''}"
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
        <span>Title:</span><span>{material.title}</span>
        <span> Description: </span>
        <span>{material.description}</span>

        <form use:enhance={enhanceHandler} method="POST">
          <input
            type="hidden"
            id="materialId"
            name="materialId"
            value={material.materialId}
          />
          <label
            class="flex items-center w-full gap-4 cursor-pointer backdrop-blur-lg"
          >
            <input
              class="checkbox"
              type="checkbox"
              name="public"
              id="public"
              checked={material.public}
            />
            Public
          </label>
        </form>
        <label
          class="flex items-center w-full gap-4 cursor-pointer backdrop-blur-lg"
        >
          <input
            class="checkbox"
            type="checkbox"
            name="featured"
            id="featured"
            checked={material.featured}
            disabled={!materials[i].public}
            on:change|preventDefault={(e) => console.log('hello')}
          />
          Featured
        </label>
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
</div>

<h2 class="pl-10 m-4 h2">Genres</h2>
{#each genres as genre (genre.genreId)}
  <div
    class="flex justify-between gap-4 p-4 m-4 card"
    transition:slide={{ duration: 500, easing: quintOut, y: '100%' }}
  >
    <span>{genre.name}</span>
    <form use:enhance action="?/removeGenre" method="post">
      <input type="hidden" name="genreId" id="genreId" value={genre.genreId} />
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

<h2 class="pl-10 m-4 h2">Users</h2>
{#each users as user}
  <div class="flex justify-between gap-4 p-4 m-4 card">
    <p>{user.email}</p>
    <p>{user.role}</p>
  </div>
{/each}

<h2 class="pl-10 m-4 h2">Roles</h2>
{#each roles as role}
  <div class="flex justify-between gap-4 p-4 m-4 card">
    <p>{role.name}</p>
  </div>
{/each}
