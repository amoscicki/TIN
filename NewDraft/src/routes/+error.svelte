<script>
  import { page } from '$app/stores';
</script>

HI

<pre class="p-4 m-4 card variant-glass-secondary">{JSON.stringify(
    $page,
    null,
    2
  )}</pre>
