<script>
  import { page } from '$app/stores';
</script>

{#if $page.error}
  <h1 class="h1">Error {$page.status}</h1>
  <p>{$page.error.message}</p>
{/if}
<!-- 
<pre class="p-4 m-4 card variant-glass-secondary">{JSON.stringify(
    $page,
    null,
    2
  )}</pre> -->
