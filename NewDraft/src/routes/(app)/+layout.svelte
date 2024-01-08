<script>
  import { page } from '$app/stores';
  import { AppShell } from '@skeletonlabs/skeleton';
  import { Rail } from '$lib';
</script>

<AppShell class="h-screen">
  <Rail slot="sidebarLeft" />
  <slot />
</AppShell>
