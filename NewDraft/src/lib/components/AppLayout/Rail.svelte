<script>
  import { AppRail, AppRailAnchor, Avatar } from '@skeletonlabs/skeleton';
  import { enhance, applyAction } from '$app/forms';
  import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { LoggedIn, LoggedOut } from '$lib';
  // TODO better language list
  const languages = [
    {
      name: 'English',
      code: 'en'
    },
    {
      name: 'Polski',
      code: 'pl'
    }
  ];

  export let location = '';

  const setLaunguage = (code) => {
    // TODO set language
    console.log('setLaunguage', code);
  };

  let selectLanguage = false;

  const enhanceHandler = () => {
    return async ({ result }) => {
      await applyAction(result);
    };
  };
</script>

<AppRail regionDefault="space-y-4" gap="gap-4" class="[&_*]:overflow-clip">
  <LoggedIn slot="lead">
    <AppRailAnchor
      href="/profile"
      name="profile"
      title="profile"
      selected={'/profile' === location}
    >
      <Avatar class="m-auto placeholder-circle animate-pulse" src="" />
    </AppRailAnchor>
  </LoggedIn>
  <LoggedOut>
    <AppRailAnchor href="/">
      <div class="flex items-center m-4 animate-pulse">
        <i class="m-auto fa-solid fa-th-large fa-3x fa-home" />
      </div>
    </AppRailAnchor>
  </LoggedOut>
  <AppRailAnchor
    href="/dashboard"
    name="dashboard"
    title="dashboard"
    selected={'/dashboard' === location}
  >
    <div class="flex items-center m-4 animate-pulse">
      <i class="m-auto fa-solid fa-th-large fa-3x fa-fw" />
    </div>
  </AppRailAnchor>
  <LoggedIn>
    <AppRailAnchor
      href="/stats"
      name="stats"
      title="stats"
      selected={'/stats' === location}
    >
      <div class="m-4 animate-pulse">
        <i class="m-auto fa-solid fa-chart-line fa-3x fa-fw" />
      </div>
    </AppRailAnchor>
  </LoggedIn>
  <LoggedIn roles={['admin']}>
    <AppRailAnchor
      href="/admin"
      name="admin"
      title="admin"
      selected={'admin' === location}
    >
      <div class="m-4 animate-pulse">
        <i class="m-auto fa-solid fa-cog fa-3x fa-fw" />
      </div>
    </AppRailAnchor>
  </LoggedIn>
  <div
    slot="trail"
    transition:slide={{
      duration: 250,
      y: '100%',
      easing: quintOut
    }}
  >
    <AppRailAnchor
      href=""
      on:click={() => (selectLanguage = !selectLanguage)}
      name="change language"
      title="change language"
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
        {#each languages as language (language)}
          <AppRailAnchor
            href=""
            on:click={() => setLaunguage(language.code)}
            name={language.name}
            title={language.name}
          >
            <div class="m-4 text-xl animate-pulse">
              {language.code}
            </div>
          </AppRailAnchor>
        {/each}
      </div>
    {/if}

    <LoggedIn>
      <AppRailAnchor>
        <form
          use:enhance={enhanceHandler}
          action="/api/auth?/logout"
          method="POST"
        >
          <button class="flex items-center m-4 animate-pulse" type="submit">
            <i class="m-auto fa-solid fa-sign-out fa-3x fa-fw" />
          </button>
        </form>
      </AppRailAnchor>
    </LoggedIn>
  </div>
</AppRail>

<style>
</style>
