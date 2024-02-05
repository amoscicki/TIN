<script>
  import { page } from '$app/stores';
  import { t } from '$lib/translations';
  import { invalidateAll } from '$app/navigation';
  import { getToastStore } from '@skeletonlabs/skeleton';
  import { toaster } from '$lib';
  import { enhance, applyAction } from '$app/forms';
  import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  export let form;
  export let data;

  const popToast = toaster(getToastStore());

  const enhanceHandler = ({ cancel }) => {
    console.log('enhanceHandler');
    return async ({ result }) => {
      console.log('enhanceHandler', result);
      if (200 !== result?.status && result?.data?.errors) {
        for (const [key, value] of Object.entries(result.data)) {
          if ('errors' === key) continue;
          if (value) popToast(key);
        }
        return;
      }

      if (result?.status === 200 && result?.data?.toastMessage)
        popToast(result.data.toastMessage);
      await invalidateAll();
      await applyAction(result);
    };
  };

  let questions = [];
  $: questions = data?.material?.questions;

  let genres = data?.genres ?? [];

  data?.material?.genres?.forEach((g) => {
    const id = g.genreId;
    genres.find((genre) => genre.genreId === id).highlight = g.highlighted;
    genres.find((genre) => genre.genreId === id).showOptions = true;
  });
</script>

<h2 class="h2">
  {$t('lang.editMaterial')}
</h2>
{#if form?.errors}
  <div class="p-4 card variant-soft-error">
    Error
    <pre>{JSON.stringify(form, null, 2)}</pre>
  </div>
{/if}

<form
  action="/api/materials?/update"
  use:enhance={enhanceHandler}
  class="flex flex-col gap-4 p-4 card"
  method="POST"
  enctype="multipart/form-data"
>
  <input
    type="hidden"
    name="materialId"
    id="materialId"
    value={data?.material?.materialId}
  />
  <label class="flex gap-4">
    <input
      class="checkbox"
      type="checkbox"
      name="public"
      id="public"
      checked={data?.material?.public}
    />
    {$t('lang.public')}
  </label>
  <label class="flex flex-col gap-4">
    {$t('lang.title')}
    <input
      class="input"
      type="text"
      name="title"
      id="title"
      value={data?.material?.title}
    />
  </label>
  <label class="flex flex-col gap-4">
    {$t('lang.Description')}
    <textarea class="input" name="description" id="description"
      >{data?.material?.description}</textarea
    >
  </label>
  <label
    class="grid grid-cols-[auto_5rem_1fr] items-center justify-start gap-4"
  >
    {#if data?.material?.image}
      <img
        class="object-cover w-32 h-32 rounded-3xl"
        src="data:{data.material?.imageType};base64,{data.material?.image}"
        alt={data?.material?.imageName}
      />
    {:else}
      <div class="w-0" />
    {/if}
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
    <fieldset class="p-0 card flex-col flex gap-2">
      {#each genres as genre (genre.genreId)}
        <label
          class="grid px-4 h-12 !overflow-y-clip align-items-center variant-outline-tertiary grid-cols-[auto_1fr_auto] rounded-3xl justify-between items-center gap-4 {genre.showOptions
            ? 'variant-ghost-tertiary'
            : ''}"
        >
          <input
            class="checkbox"
            type="checkbox"
            name="genres"
            id={genre.genreId}
            value={genre.genreId}
            bind:checked={genre.showOptions}
          />
          {genre.name}
          {#if genre.showOptions}
            <label
              class="rounded-3xl flex gap-4 p-4 h-4 m-0 items-center justify-center {genre.highlight
                ? 'variant-ghost-tertiary'
                : ''}"
              for="highlight"
            >
              <input
                type="checkbox"
                class="checkbox"
                name="highlight"
                value={genre.genreId}
                id="highlight-{genre.genreId}"
                bind:checked={genre.highlight}
              />
              {$t('lang.highlight')}
            </label>
          {/if}
        </label>
      {/each}
    </fieldset>
  </label>

  <div class="flex flex-col gap-2 p-4 card">
    <h2 class="h2">
      {$t('lang.questions')}
    </h2>
    {#each questions as question, i (i)}
      <div
        transition:slide={{ duration: 500, easing: quintOut, y: '100%' }}
        class="grid grid-cols-[1fr_auto] pl-8 pr-4 py-2 gap-4 items-center card"
      >
        <div class="flex flex-col gap-2">
          <div class="grid grid-cols-[4rem_1fr] items-center gap-4">
            {$t('lang.question')}
            <input
              type="hidden"
              name="questionId"
              value={question.questionId}
            />
            <input type="text" bind:value={question.question} class="input" />
          </div>
          <div class="grid grid-cols-[4rem_1fr] items-center gap-4">
            {$t('lang.answer')}
            <input type="hidden" name="answerId" value={question.answerId} />
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
    {$t('lang.save')}</button
  >
</form>

<pre class="card m-4 p-4 variant-glass-secondary">{JSON.stringify(
    genres,
    null,
    2
  )}</pre>
