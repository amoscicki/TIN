<script>
  import { goto } from '$app/navigation';
  import { getToastStore } from '@skeletonlabs/skeleton';
  import { t } from '$lib/translations';
  import { enhance, applyAction } from '$app/forms';
  import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { toaster } from '$lib';
  export let form;
  export let data;

  const popToast = toaster(getToastStore());

  const enhanceHandler = ({ cancel }) => {
    return async ({ result }) => {
      if (400 === result?.status && result?.data?.errors) {
        for (const [key, value] of Object.entries(result.data)) {
          if ('errors' === key) continue;
          if (value) popToast(key);
        }
        return;
      }

      if (result?.status === 200 && result?.data?.toastMessage)
        popToast(result.data.toastMessage);

      await applyAction(result);
      goto('/');
    };
  };
  const genres = data?.genres ?? [];
  let questions = [
    {
      question: 'How many apples grow on a tree?',
      answer: 'All of them'
    }
  ];

  // TODO[M] client validation
  // TODO[M] success message and form clear
</script>

<h2 class="h2">
  {$t('lang.newMaterial')}
</h2>

<form
  action="/api/materials?/add"
  use:enhance={enhanceHandler}
  class="flex flex-col gap-4 p-4 card"
  method="POST"
  enctype="multipart/form-data"
>
  <label class="flex gap-4">
    <input class="checkbox" type="checkbox" name="public" id="public" />
    {$t('lang.public')}
  </label>
  <label class="flex flex-col gap-4">
    {$t('lang.title')}
    <input class="input" type="text" name="title" id="title" />
  </label>
  <label class="flex flex-col gap-4">
    {$t('lang.Description')}
    <textarea class="input" name="description" id="description"></textarea>
  </label>
  <label class="grid grid-cols-[5rem_1fr] items-center justify-start gap-4">
    {$t('lang.image')}
    <input
      class="input"
      type="file"
      accept="image/png, image/jpeg, image/webp"
      name="image"
      id="image"
    />
  </label>
  <label class="grid grid-cols-[5rem_1fr] items-center justify-start gap-4">
    {$t('lang.sourceMaterial')} (PDF):
    <input
      class="input"
      type="file"
      accept="application/pdf"
      name="source"
      id="source"
    />
  </label>

  <label class="flex flex-col gap-4">
    {$t('lang.genres')}
    <fieldset class="p-4 card">
      {#each genres as genre (genre.genreId)}
        <label class="flex gap-4 p-4">
          <input
            class="checkbox"
            type="checkbox"
            name="genres"
            id={genre.genreId}
            value={genre.genreId}
          />
          {genre.name}
        </label>
      {/each}
    </fieldset>
  </label>

  <div class="flex flex-col gap-2 p-4 card">
    <h2 class="h2">
      {$t('lang.questions')}
    </h2>
    {#each questions as question, i}
      <div
        transition:slide={{ duration: 500, easing: quintOut, y: '100%' }}
        class="grid grid-cols-[1fr_auto] pl-8 pr-4 py-2 gap-4 items-center card"
      >
        <div class="flex flex-col gap-2">
          <div class="grid grid-cols-[4rem_1fr] items-center gap-4">
            {$t('lang.question')}
            <input type="text" bind:value={question.question} class="input" />
          </div>
          <div class="grid grid-cols-[4rem_1fr] items-center gap-4">
            {$t('lang.answer')}
            <input type="text" bind:value={question.answer} class="input" />
          </div>
        </div>
        <button
          title={$t('lang.delete')}
          class="rounded-full btn-icon variant-filled-primary"
          on:click|preventDefault={() => {
            questions = questions.filter((q, index) => index !== i);
          }}
        >
          <i class="fa-solid fa-x" />
        </button>
      </div>
    {/each}
    <button
      title={$t('lang.addQuestion')}
      class="mb-8 rounded-full btn variant-filled-primary"
      on:click|preventDefault={() => {
        questions = [...questions, { question: '', answer: '' }];
      }}
    >
      <i class="fa-solid fa-plus" />
    </button>
  </div>

  <input
    type="hidden"
    name="questions"
    id="questions"
    value={JSON.stringify(questions)}
  />
  <button class="btn variant-filled-primary" type="submit">
    {$t('lang.save')}
  </button>
</form>
