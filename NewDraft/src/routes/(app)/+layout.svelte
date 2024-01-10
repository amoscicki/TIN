<script>
  import { AppShell } from '@skeletonlabs/skeleton';
  import { page } from '$app/stores';
  import { Rail } from '$lib';
  import { fade } from 'svelte/transition';
</script>

<AppShell class="h-screen">
  <Rail slot="sidebarLeft" />
  <slot />
</AppShell>
