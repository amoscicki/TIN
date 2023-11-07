<script>
  import {
    AppRail,
    AppRailTile,
    AppRailAnchor,
    Avatar,
  } from "@skeletonlabs/skeleton";
  let currentTile = 0;
  let lang = 0;
</script>

<main class="relative h-screen flex flex-row overflow-hidden">
  <AppRail
    regionDefault="space-y-4"
    gap="gap-4"
    class="overflow-hidden"
  >
    <svelte:fragment slot="lead">
      <AppRailTile
        bind:group={currentTile}
        name="tile-0"
        value={99}
        title="tile-0"
      >
        <Avatar
          class="m-auto placeholder-circle animate-pulse"
          src=""
        />
      </AppRailTile>
    </svelte:fragment>
    <AppRailTile
      bind:group={currentTile}
      name="tile-1"
      value={0}
      title="tile-1"
    >
      <div class=" animate-pulse m-4 flex items-center">
        <i class="fa-solid fa-th-large fa-3x fa-fw m-auto" />
      </div>
    </AppRailTile>
    <AppRailTile
      bind:group={currentTile}
      name="tile-2"
      value={1}
      title="tile-2"
    >
      <div class="animate-pulse m-4">
        <!-- fa stocks -->
        <i class="fa-solid fa-chart-line fa-3x fa-fw m-auto" />
      </div>
    </AppRailTile>
    <AppRailTile
      bind:group={currentTile}
      name="tile-3"
      value={2}
      title="tile-3"
    >
      <div class="animate-pulse m-4">
        <!-- fa admin cogwheel -->
        <i class="fa-solid fa-cog fa-3x fa-fw m-auto" />
      </div>
    </AppRailTile>
    <svelte:fragment slot="trail">
      <AppRailAnchor
        href=""
        on:click={() => {
          //todo
        }}
        bind:group={lang}
        name="change language"
        title="change language"
      >
        <div class="animate-pulse m-4">
          <i class="fa-solid fa-language fa-3x fa-fw m-auto" />
        </div>
      </AppRailAnchor>
      <AppRailAnchor href="/">
        <div class="animate-pulse m-4 flex items-center">
          <i class="fa-solid fa-sign-out fa-3x fa-fw m-auto" />
        </div>
      </AppRailAnchor>
    </svelte:fragment>
  </AppRail>
  <div class="relative w-full overflow-scroll p-4">
    <slot />
  </div>
</main>
