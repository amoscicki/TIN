<script>
  import { goto } from "$app/navigation";
  import Carousel from "../../lib/components/Carousel/Carousel.svelte";
  let authenticated = false;
  let elements = [
    {
      image: "https://source.unsplash.com/random?1",
      name: "material1",
      description: "material1-desc",
      id: 1,
    },
    {
      image: "https://source.unsplash.com/random?2",
      name: "material2",
      description: "material2-desc",
      id: 2,
    },
    {
      image: "https://source.unsplash.com/random?3",
      name: "material3",
      description: "material3-desc",
      id: 3,
    },
    {
      image: "https://source.unsplash.com/random?4",
      name: "material4",
      description: "material4-desc",
      id: 4,
    },
    {
      image: "https://source.unsplash.com/random?5",
      name: "material5",
      description: "material5-desc",
      id: 5,
    },
    {
      image: "https://source.unsplash.com/random?6",
      name: "material6",
      description: "material6-desc",
      id: 6,
    },
  ];
</script>

<div class="flex flex-col gap-4 items-center card mt-10 p-10 px-auto w-full">
  <h2
    class="h2 bg-gradient-to-r from-primary-500 to-tertiary-500 bg-clip-text text-transparent"
  >
    Featured public materials
  </h2>
  <div
    class="relative card variant-ghost-primary flex items-center overflow-hidden"
  >
    <div
      class="absolute p-2 h-full flex items-center bg-gradient-to-r from-primary-700 to-transparent"
    >
      <button
        type="button"
        class=" btn-icon variant-filled m-4 aspect-square p-6"
        on:click={() => {
          document
            .getElementById("featured-materials-carousel")
            .scrollBy(-100, 0);
        }}
      >
        <i class="fa-solid fa-arrow-left" />
      </button>
    </div>
    <div
      id="featured-materials-carousel"
      class="p-14 px-40 snap-x scroll-px-40 hide-scrollbar snap-mandatory scroll-smooth flex overflow-x-auto gap-6"
    >
      {#each elements as element}
        <button
          class="snap-start shrink-0 card variant-ghost-tertiary flex flex-col p-4"
        >
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
    </div>
    <div
      class="absolute right-0 p-2 h-full flex items-center bg-gradient-to-r to-primary-700 from-transparent"
    >
      <button
        type="button"
        class="btn-icon variant-filled m-4 aspect-square p-6"
        on:click={() => {
          document
            .getElementById("featured-materials-carousel")
            .scrollBy(100, 0);
        }}
      >
        <i class="fa-solid fa-arrow-right" />
      </button>
    </div>
  </div>
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
<Carousel
  {elements}
  title="TESTING PROPS"
/>
