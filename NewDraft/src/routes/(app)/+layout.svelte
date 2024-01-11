<script>
  import { AppShell } from '@skeletonlabs/skeleton';
  import { Rail } from '$lib';
</script>

<AppShell class="h-screen">
  <Rail slot="sidebarLeft" />
  <div class="max-w-[1300px] mx-auto">
    <slot />
  </div>
</AppShell>
