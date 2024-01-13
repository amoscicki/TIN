<script>
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { t } from '$lib/translations';
  import { LoadingSpinner, MaterialCard } from '$lib';
  // import { browser } from '$app/environment';
  import { goto, invalidateAll } from '$app/navigation';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  export let data;

  let card;

  let q = $page.url.searchParams.get('q') || 0;
  const total = data.total;

  let direction = 1;

  const rotate = () => {
    const rotated = card.style.transform === 'rotateY(180deg)';
    card.style.transform = `rotateY(${rotated ? 0 : 180}deg)`;
  };

  onMount(async () => {
    invalidateAll();
    card.style = '';
  });

  $: goto(`?q=${q}`, { replaceState: false });

  let questions = [];

  $: console.log(questions);
  $: questions = [];
  $: Promise.resolve(data.question).then((res) => {
    questions = res;
  });
</script>

<h1 class="w-full prose text-center h1">{$t('lang.flashcard')}</h1>
<div class="flex justify-center w-full pt-12 gap-y-10 gap-96 h-[400px]">
  <button
    on:click={() => {
      if (q > 0) q = parseInt(q) - 1;
      direction = -1;
    }}
    class="my-8 btn variant-filled-primary"
  >
    &lt;
  </button>
  {#if questions.length === 0}
    <MaterialCard setVariant={1}>
      <div class="grid w-full place-items-center">
        <LoadingSpinner />
      </div>
    </MaterialCard>
  {/if}
  {#each questions as question (question.questionId)}
    <button
      in:fly={{
        x: `${direction < 0 ? '-' : ''}100%`,
        delay: 250,
        duration: 250,
        easing: quintOut
      }}
      out:fly={{
        x: `${direction > 0 ? '-' : ''}100%`,
        duration: 250,
        easing: quintOut
      }}
      class="btn [perspective:_500px] w-72 h-[30rem] absolute"
      on:click={rotate}
    >
      <div
        class="[transform-style:_preserve-3d] transition-all duration-1000 inset-0 absolute"
        bind:this={card}
      >
        <div class="absolute inset-0 [backface-visibility:_hidden]">
          <MaterialCard setVariant={'!m-0'}>
            <div class="grid w-full p-4 place-items-center">
              <p class="text-wrap">{question.question}</p>
            </div>
          </MaterialCard>
        </div>
        <div
          class="absolute inset-0 [backface-visibility:_hidden] [transform:_rotateY(180deg)]"
        >
          <MaterialCard setVariant={'!m-0 variant-ghost-secondary'}>
            <div class="grid w-full p-4 place-items-center">
              <p class="text-wrap">{question.Answer[0].answer}</p>
            </div>
          </MaterialCard>
        </div>
      </div>
    </button>
  {/each}
  <button
    on:click={() => {
      if (q < total - 1) q = parseInt(q) + 1;
      direction = 1;
    }}
    class="my-8 btn variant-filled-primary"
  >
    &gt;
  </button>
</div>
<div class="m-4 text-3xl text-center">{parseInt(q) + 1} / {total}</div>
