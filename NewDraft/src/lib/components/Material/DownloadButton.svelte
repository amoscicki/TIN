<script>
  export let source;
  import { t } from '$lib/translations';
</script>

{#if source.name}
  <a
    class="flex items-center justify-center gap-4 btn variant-filled-primary"
    download={source.name}
    href={`data:${source.type};base64,${source.data}`}
  >
    <i class="fa fa-download" />
    {$t('lang.download')}
  </a>
{/if}
