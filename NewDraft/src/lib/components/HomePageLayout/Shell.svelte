<script>
  import { page } from '$app/stores';
  import {
    AppRail,
    AppRailAnchor,
    getToastStore
  } from '@skeletonlabs/skeleton';
  import { quintOut } from 'svelte/easing';
  import { slide } from 'svelte/transition';
  import { enhance, applyAction } from '$app/forms';
  import { t, locales } from '$lib/translations';
  import { invalidateAll } from '$app/navigation';
  import { toaster } from '$lib';
  const popToast = toaster(getToastStore());
  let selectLanguage = false;
  const enhanceHandler = () => {
    return async ({ result }) => {
      const message = result?.data?.toastQueue;
      await invalidateAll();
      await applyAction(result);
      if (message) {
        popToast(message);
      }
    };
  };
</script>

<main
  class="relative flex flex-wrap justify-center w-screen h-dvh overflow-clip"
>
  <div class="absolute w-full lg:top-0 lg:w-1/2 lg:relative">
    <slot name="lead" />
  </div>
  <div
    class="max-lg:absolute max-lg:px-[20%] max-lg:grid max-lg:w-full max-lg:place-items-center lg:w-1/2 lg:relative lg:flex lg:items-start max-sm:top-14 top-60 lg:justify-center"
  >
    <slot name="tail" />
  </div>
</main>
<AppRail
  regionDefault="space-y-4"
  background=""
  gap="gap-4"
  class="[&_*]:overflow-clip !max-h-fit !h-fit absolute right-0 top-0"
>
  <svelte:fragment slot="lead">
    <AppRailAnchor
      href=""
      on:click={() => (selectLanguage = !selectLanguage)}
      name={$t('lang.changeLanguage')}
      title={$t('lang.changeLanguage')}
    >
      <div class="m-4 animate-pulse">
        <i class="m-auto fa-solid fa-language fa-3x fa-fw" />
      </div>
    </AppRailAnchor>

    {#if selectLanguage}
      <div
        class="overflow-clip"
        transition:slide={{
          duration: 250,
          y: '100%',
          easing: quintOut
        }}
      >
        {#each $locales as language (language)}
          <form
            action="/api/language"
            method="POST"
            use:enhance={enhanceHandler}
          >
            <input type="hidden" name="code" id="code" value={language} />
            <button
              name={$t(`lang.${language}`)}
              title={$t(`lang.${language}`)}
              class="w-full rounded-[100vw]"
              type="submit"
            >
              <AppRailAnchor
                href
                class="pointer-events-none"
                on:click={(e) => {
                  e.preventDefault();
                }}
                selected={language === $page.data.language}
              >
                <div class="m-4 text-xl animate-pulse">
                  {language}
                </div>
              </AppRailAnchor>
            </button>
          </form>
        {/each}
      </div>
    {/if}
  </svelte:fragment>
</AppRail>
