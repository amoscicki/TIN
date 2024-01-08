<script>
  export let materials = [];
</script>

<h2 class="pl-10 m-4 h2">Featured Materials</h2>
<div class="grid grid-cols-4">
  {#each materials as material, i (i)}
    <div
      class="relative flex flex-col items-start gap-4 p-4 m-4 text-left border-2 card border-secondary-500 variant-soft-secondary"
    >
      {#if material.imageName}
        <div class="absolute object-cover opacity-50 inset-6 -z-10">
          <img
            src={`data:${material.imageType};base64,${material.image}`}
            alt={material.imageName}
          />
        </div>
      {/if}

      <p>Title <span class="inline-block w-4" />{material.title}</p>
      <p>
        Description <span class="inline-block w-full" />
        {material.description}
      </p>
      {#if material.genres.length > 0}
        <div class="grid grid-cols-2 gap-4 p-4 m-4 card variant-soft-surface">
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

<style>
</style>
