<script>
  import { userStore, resolveCurrentUser } from '$lib/stores';

  $: if (!$userStore) resolveCurrentUser();
</script>

{#if !$userStore}
  <slot />
{/if}
