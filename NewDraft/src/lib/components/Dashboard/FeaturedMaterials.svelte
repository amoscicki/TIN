<script>
  import {
    DownloadButton,
    GenresCard,
    MaterialCard,
    TitleDescription
  } from '$lib';
  export let materials = [];
</script>

<h2 class="pl-10 m-4 h2">Featured Materials</h2>
<div class="flex flex-wrap">
  {#each materials as material, i (i)}
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
  {/each}
</div>

<style>
</style>
