<script>
  export let elements;
  export let title;
  let carousel;

  let id = () => {
    const ids = document.querySelectorAll("[id^='carousel-']");
    console.log("ids - ", ids);
    return "blah";
  };
</script>

<div class="flex flex-col gap-4 items-center card mt-10 p-10 px-auto w-full">
  <h2
    class="h2 bg-gradient-to-r from-primary-500 to-tertiary-500 bg-clip-text text-transparent"
  >
    {title}
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
          carousel.scrollBy(-100, 0);
        }}
      >
        <i class="fa-solid fa-arrow-left" />
      </button>
    </div>
    <div
      bind:this={carousel}
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
          carousel.scrollBy(100, 0);
        }}
      >
        <i class="fa-solid fa-arrow-right" />
      </button>
    </div>
  </div>
</div>
