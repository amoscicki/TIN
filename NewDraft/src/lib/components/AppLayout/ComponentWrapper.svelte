<script>
  export let component = null;
  export let props = {};
</script>

{#if null === component}
  <slot />
{:else}
  <svelte:component this={component} {...props}>
    <slot />
  </svelte:component>
{/if}

<style>
</style>
