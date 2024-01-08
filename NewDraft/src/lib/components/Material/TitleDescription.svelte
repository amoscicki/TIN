<script>
  export let title = '';
  export let descriptors = [];
  export let labels = false;
</script>

{#if labels}
  <p>Title</p>
{/if}
<h3 class="font-bold h3"><p>{title}</p></h3>
{#each descriptors as descriptor}
  {#if labels}
    <p>{descriptor.label}</p>
  {/if}
  <p class="font-bold">{descriptor.content}</p>
{/each}
