<script>
  import {
    AppRail,
    AppRailTile,
    AppRailAnchor,
    Avatar,
  } from "@skeletonlabs/skeleton";
  let currentTile = 0;
</script>

<main class="relative h-screen flex flex-row overflow-hidden">
  <AppRail>
    <svelte:fragment slot="lead">
      <AppRailTile
        bind:group={currentTile}
        name="tile-0"
        value={99}
        title="tile-0"
      >
        <Avatar src="https://source.unsplash.com/random?face" />
      </AppRailTile>
    </svelte:fragment>
    <AppRailTile
      bind:group={currentTile}
      name="tile-1"
      value={0}
      title="tile-1"
    >
      <div class="text-3xl">test</div>
    </AppRailTile>
    <AppRailTile
      bind:group={currentTile}
      name="tile-2"
      value={1}
      title="tile-2"
    >
      <div class="placeholder-circle animate-pulse m-4" />
    </AppRailTile>
    <AppRailTile
      bind:group={currentTile}
      name="tile-3"
      value={2}
      title="tile-3"
    >
      <div class="placeholder-circle animate-pulse m-4" />
    </AppRailTile>
    <AppRailTile
      bind:group={currentTile}
      name="tile-4"
      value={3}
      title="tile-4"
    >
      <div class="placeholder-circle animate-pulse m-4" />
    </AppRailTile>
    <svelte:fragment slot="trail">
      <AppRailAnchor href="/">
        <div class="placeholder-circle animate-pulse m-4" />
      </AppRailAnchor>
    </svelte:fragment>
  </AppRail>
  <div class="relative w-full overflow-scroll p-4">
    <slot />
  </div>
</main>
