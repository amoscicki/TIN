<script>
  import { t } from '$lib/translations';
  export let genres = [];
  export let variant = '';
  console.log(genres);
</script>

{#if genres.length > 0}
  <div class="grid grid-cols-2 gap-4 p-4 card w-full {variant}">
    <h3 class="col-span-2 h3">
      {$t('lang.genres')}
    </h3>
    {#each genres as genre}
      <div
        class="{genre?.highlighted
          ? '!shadow-md !shadow-warning-600'
          : ''} text-center variant-soft-secondary rounded-3xl"
      >
        {genre?.name ?? genre}
      </div>
    {/each}
  </div>
{/if}
