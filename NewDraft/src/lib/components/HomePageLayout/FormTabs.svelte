<script>
  import { Tab, TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
  export let tabs = [];
  export let TabAnchors = [];
  export let props = {};
  let tabSet = tabs[0]?.value || 0;
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
      <TabAnchor href={tabAnchor.href} class={tabAnchor.class}>
        <span>{tabAnchor.label}</span>
      </TabAnchor>
    {/each}
  {/if}
  <svelte:fragment slot="panel">
    {#if tabs?.length > 0}
      {#each tabs as tab}
        {#if tab.value === tabSet}
          <svelte:component this={tab.component} {...props} />
        {/if}
      {/each}
    {/if}
  </svelte:fragment>
</TabGroup>

<style>
</style>
