<script>
  import { userStore, resolveCurrentUser } from '$lib/stores';
  import { onMount } from 'svelte';
  const user = userStore;

  onMount(() => {
    resolveCurrentUser();
  });
</script>

{#if !$user}
  <slot />
{/if}
