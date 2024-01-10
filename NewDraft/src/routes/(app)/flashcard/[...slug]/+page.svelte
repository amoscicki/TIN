<script>
  import { LoadingSpinner, MaterialCard } from '$lib';
  import { browser } from '$app/environment';
  import { goto, invalidateAll } from '$app/navigation';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  export let data;

  let card;
  let cardRotated = 180;

  let q = $page.url.searchParams.get('q') || 0;
  const total = data.total;

  const rotate = () => {
    cardRotated += 180;
    cardRotated %= 360;
    card.style.transform = `rotateY(${cardRotated}deg)`;
  };

  onMount(() => {
    invalidateAll();
    rotate();
  });

  $: browser && goto(`?q=${q}`);
</script>

<h1 class="w-full prose text-center h1">FLASHCARD</h1>
<div class="flex justify-center w-full gap-8">
  <button
    on:click={() => {
      if (q > 0) q = parseInt(q) - 1;
    }}
    class="my-8 btn variant-filled-primary"
  >
    &lt;
  </button>
  {#await data.question}
    <MaterialCard setVariant={1}>
      <div class="grid w-full place-items-center">
        <LoadingSpinner />
      </div>
    </MaterialCard>
  {:then resolved}
    <button
      class="btn [perspective:_500px] relative w-72 h-[30rem]"
      on:click={rotate}
    >
      <div
        class="[transform-style:_preserve-3d] transition-all duration-1000 inset-0 absolute"
        bind:this={card}
      >
        <div class="absolute inset-0 [backface-visibility:_hidden]">
          <MaterialCard setVariant={'m-0'}>
            <div class="grid w-full p-4 place-items-center">
              {resolved[0].question}
            </div>
          </MaterialCard>
        </div>
        <div
          class="absolute inset-0 [backface-visibility:_hidden] [transform:_rotateY(180deg)]"
        >
          <MaterialCard setVariant={'m-0'}>
            <div class="grid w-full p-4 place-items-center">
              {resolved[0].Answer[0].answer}
            </div>
          </MaterialCard>
        </div>
      </div>
    </button>
  {:catch error}
    <p class="text-red-500">{error.message}</p>
  {/await}
  <button
    on:click={() => {
      if (q < total - 1) q = parseInt(q) + 1;
    }}
    class="my-8 btn variant-filled-primary"
  >
    &gt;
  </button>
</div>
<div class="m-4 text-3xl text-center">{parseInt(q) + 1} / {total}</div>
