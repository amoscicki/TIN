<script>
  import { page } from '$app/stores';
  import { AppShell } from '@skeletonlabs/skeleton';
  import { Rail } from '$lib';
  $: location = $page.url.pathname;
</script>

<AppShell class="h-screen">
  <Rail {location} slot="sidebarLeft" />
  <slot />
</AppShell>
