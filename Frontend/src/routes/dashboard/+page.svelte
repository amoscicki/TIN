<script>
  import { goto } from "$app/navigation";
  import Carousel from "$lib/components/Carousel/Carousel.svelte";
  let authenticated = false;
  import elements from "$lib/mockdata/featured-materials.json";
</script>

<Carousel
  title="Featured materials"
  {elements}
/>
<div class="flex flex-col gap-4 items-center card mt-10 p-10 px-auto w-full">
  <h2
    class="h2 bg-gradient-to-r from-primary-500 to-tertiary-500 bg-clip-text text-transparent"
  >
    Your materials
  </h2>
  <div class="card variant-ghost-primary p-4">
    <div class="flex gap-6 m-10">
      {#if authenticated}
        {#each elements.slice(0, 3) as element}
          <button class="card variant-ghost-tertiary flex flex-col p-4">
            <!-- extract to component -->
            <!-- {element.id} -->
            <img
              src={element.image}
              alt={element.description}
              class="w-48 aspect-square object-cover"
            />
            <!-- <p>{element.name}</p> -->
          </button>
        {/each}
      {/if}
      <button
        class="btn card variant-ghost-tertiary flex flex-col text-center justify-center p-4 aspect-square"
        on:click={(e) => goto("/")}
      >
        <i class="fa-solid fa-plus-circle fa-3x w-48" />
      </button>
    </div>
  </div>
</div>
