<script>
  import CarouselImage from "../ImageLoader.svelte";
  export let elements;
  export let title;
  let carousel;
</script>

<div class="flex flex-col gap-4 items-center card mt-10 p-10 px-auto w-full">
  <h2
    class="h2 bg-gradient-to-r from-primary-500 to-tertiary-500 bg-clip-text text-transparent"
  >
    {title}
  </h2>
  <div class="relative card variant-ghost-primary flex overflow-hidden w-full">
    <div class=" p-2 flex items-center bg-primary-700">
      <button
        type="button"
        class=" btn-icon variant-filled m-4 aspect-square p-6"
        on:click={() => {
          carousel.scrollLeft > 0 && carousel.scrollBy(-100, 0);
        }}
      >
        <i class="fa-solid fa-arrow-left" />
      </button>
    </div>
    <div
      class="absolute h-full -ml-2 left-28 bg-gradient-to-r from-primary-700 to-transparent w-20"
    />
    <div
      bind:this={carousel}
      class="p-14 px-40 snap-x scroll-px-20 hide-scrollbar snap-mandatory scroll-smooth flex overflow-x-auto gap-6"
    >
      {#each elements as element (element)}
        <button
          class="snap-start shrink-0 card variant-ghost-tertiary flex flex-col p-4"
        >
          <div
            class="w-48 aspect-square object-cover flex items-center justify-center"
          >
            <CarouselImage
              src={element.image}
              alt={element.description}
            />
          </div>
        </button>
      {/each}
    </div>
    <div
      class="absolute h-full -mr-2 right-28 bg-gradient-to-l from-primary-700 to-transparent w-10"
    />
    <div class="right-0 p-2 flex items-center bg-primary-700">
      <button
        type="button"
        class="btn-icon variant-filled m-4 aspect-square p-6"
        on:click={() => {
          carousel.scrollLeft < carousel.scrollWidth - carousel.clientWidth &&
            carousel.scrollBy(100, 0);
        }}
      >
        <i class="fa-solid fa-arrow-right" />
      </button>
    </div>
  </div>
</div>
