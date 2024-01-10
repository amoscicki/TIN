<script>
  import {
    MaterialCard,
    DownloadButton,
    GenresCard,
    TitleDescription
  } from '$lib';

  import { enhance, applyAction } from '$app/forms';
  export let materials = [];
  const enhanceHandler = () => {
    return async ({ result }) => {
      await applyAction(result);
    };
  };
</script>

<h2 class="pl-10 m-4 h2">Your Materials</h2>
<div class="flex flex-wrap">
  {#each materials as material, i (i)}
    <a
      href={`/flashcard/${material.materialId}?q=0`}
      class="btn [&_img]:hover:opacity-75 [&_p]:hover:backdrop-brightness-0 [&_p]:hover:backdrop-opacity-50"
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
          >
            <a
              class="w-full btn variant-filled-warning"
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
              <button class="w-full btn variant-filled-primary" type="submit">
                <i class="fa fa-trash" />
              </button>
            </form>
          </div>
        </svelte:fragment>
      </MaterialCard>
    </a>
  {/each}
  <a href="/new" class="btn">
    <MaterialCard setVariant={'variant-ghost-warning'}>
      <TitleDescription title={'Add new'} slot="lead" />
      <i class="w-full text-center fas fa-plus-circle fa-5x" />
    </MaterialCard>
  </a>
</div>

<style>
</style>
