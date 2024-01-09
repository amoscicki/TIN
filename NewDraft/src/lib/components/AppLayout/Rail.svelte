<script>
  import { page } from '$app/stores';
  import { AppRail, AppRailAnchor, Avatar } from '@skeletonlabs/skeleton';
  import { enhance, applyAction } from '$app/forms';
  import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { LoggedIn, LoggedOut, ComponentWrapper } from '$lib';
  // TODO better language list
  export const languages = [
    {
      name: 'English',
      code: 'en'
    },
    {
      name: 'Polski',
      code: 'pl'
    }
  ];

  export const routes = {
    lead: [
      {
        name: 'Home',
        title: 'Home',
        href: '/',
        icon: 'fa-home',
        auth: false
        // null - always visible
        // false - visible only when logged out
        // true - visible for logged in users
        // ['role1', 'role2' (, ...)] - visible for logged in users with one of roles ['role1', 'role2' (, ...)]
      }
    ],
    main: [
      {
        name: 'Dashboard',
        title: 'Dashboard',
        href: '/dashboard',
        icon: 'fa-th-large',
        auth: null
      },
      {
        name: 'Stats',
        title: 'Stats',
        href: '/stats',
        icon: 'fa-chart-line',
        auth: true
      },
      {
        name: 'Admin',
        title: 'Admin',
        href: '/admin',
        icon: 'fa-cog',
        auth: ['admin']
      }
    ],
    trail: []
  };

  $: location = $page.url.pathname;
  const setLaunguage = (code) => {
    // TODO set language
    console.log('setLaunguage "', code, '" invoked');
    return console.warn('setLaunguage not implemented');
  };

  let selectLanguage = false;

  const enhanceHandler = () => {
    return async ({ result }) => {
      await applyAction(result);
    };
  };

  const getWrapperProps = (auth) => {
    if ('boolean' === typeof auth)
      return { component: auth ? LoggedIn : LoggedOut, props: {} };

    if (Array.isArray(auth))
      return {
        component: LoggedIn,
        props: {
          roles: auth
        }
      };

    return {
      component: null,
      props: {}
    };
  };
</script>

<AppRail regionDefault="space-y-4" gap="gap-4" class="[&_*]:overflow-clip">
  <div slot="lead">
    <LoggedIn>
      <AppRailAnchor
        href="/profile"
        name="profile"
        title="profile"
        selected={'/profile' === location}
      >
        <Avatar class="m-auto placeholder-circle animate-pulse" src="" />
      </AppRailAnchor>
    </LoggedIn>
    {#each routes.lead as route}
      <ComponentWrapper {...getWrapperProps(route.auth)}>
        <AppRailAnchor
          href={route.href}
          name={route.name}
          title={route.title}
          selected={route.href === location}
        >
          <div class="m-4 animate-pulse">
            <i class="m-auto fa-solid fa-3x fa-fw {route.icon}" />
          </div>
        </AppRailAnchor>
      </ComponentWrapper>
    {/each}
  </div>

  {#each routes.main as route}
    <ComponentWrapper {...getWrapperProps(route.auth)}>
      <AppRailAnchor
        href={route.href}
        name={route.name}
        title={route.title}
        selected={route.href === location}
      >
        <div class="m-4 animate-pulse">
          <i class="m-auto fa-solid fa-3x fa-fw {route.icon}" />
        </div>
      </AppRailAnchor>
    </ComponentWrapper>
  {/each}

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
      <AppRailAnchor href="/api/auth/logout" name="logout" title="logout">
        <div class="flex items-center m-4 animate-pulse">
          <i class="m-auto fa-solid fa-sign-out fa-3x fa-fw" />
        </div>
      </AppRailAnchor>
    </LoggedIn>

    <LoggedOut>
      <AppRailAnchor href="/" name="exit" title="exit">
        <div class="flex items-center m-4 animate-pulse">
          <i class="m-auto fa-solid fa-sign-out fa-3x fa-fw" />
        </div>
      </AppRailAnchor>
    </LoggedOut>
  </div>
</AppRail>

<style>
</style>
