<script>
  import { page } from '$app/stores';
</script>

{#if $page.error}
  <h1 class="h1">Error {$page.status}</h1>
  <p>{$page.error.message}</p>
{/if}
