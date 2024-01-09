<script>
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { Tab, TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
  export let tabs = [];
  export let TabAnchors = [];
  export let props = {};
  export let snapshotData;

  const formData = {};
  let tabSet = $page.url.searchParams.get('t') || tabs[0]?.value;

  $: browser &&
    goto(`?t=${tabSet}`, {
      replaceState: false,
      noscroll: true,
      keepfocus: true
    });
</script>

<TabGroup
  justify="justify-around gap-6"
  flex="flex flex-grow"
  regionList="[&_label:not(active)]:variant-glass-primary"
  active="!variant-filled-primary"
  hover="hover:variant-ghost-primary"
  rounded="rounded-full"
  border=""
  class="w-full mx-[25%] p-2"
>
  {#if tabs?.length > 0}
    {#each tabs as tab}
      <Tab bind:group={tabSet} name={tab.name} value={tab.value}>
        <span>{tab.label}</span>
      </Tab>
    {/each}
  {/if}
  {#if TabAnchors?.length > 0}
    {#each TabAnchors as tabAnchor}
      <TabAnchor class={tabAnchor.class} href={tabAnchor.href}>
        <span>{tabAnchor.label}</span>
      </TabAnchor>
    {/each}
  {/if}
  <svelte:fragment slot="panel">
    {#if tabs?.length > 0}
      {#each tabs as tab}
        {#if tab.value === tabSet}
          <svelte:component this={tab.component} {snapshotData} {...props} />
        {/if}
      {/each}
    {/if}
  </svelte:fragment>
</TabGroup>

<style>
</style>
