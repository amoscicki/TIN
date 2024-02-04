<script>
  import { page } from '$app/stores';
  import { toaster } from '$lib';
  import {
    AppRail,
    AppRailAnchor,
    Avatar,
    getToastStore
  } from '@skeletonlabs/skeleton';
  import { enhance, applyAction } from '$app/forms';
  import { slide } from 'svelte/transition';
  import { invalidateAll, goto } from '$app/navigation';
  import { quintOut } from 'svelte/easing';
  import { LoggedIn, LoggedOut, ComponentWrapper, ImageLoader } from '$lib';
  import { t, locales } from '$lib/translations';

  const popToast = toaster(getToastStore());

  export let routes;
  $: routes = {
    lead: [
      {
        name: $t('lang.home'),
        title: $t('lang.home'),
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
        name: $t('lang.dashboard'),
        title: $t('lang.dashboard'),
        href: '/dashboard',
        icon: 'fa-th-large',
        auth: null
      },
      {
        name: $t('lang.stats'),
        title: $t('lang.stats'),
        href: '/stats',
        icon: 'fa-chart-line',
        auth: true
      },
      {
        name: $t('lang.admin'),
        title: $t('lang.admin'),
        href: '/admin',
        icon: 'fa-cog',
        auth: ['admin']
      }
    ],
    trail: []
  };
  $: location = $page.url.pathname;

  let selectLanguage = false;

  const enhanceHandler = () => {
    return async ({ result }) => {
      const message = result?.data?.toastQueue;
      await invalidateAll();
      await applyAction(result);
      if (message) {
        await popToast(message);
      }
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
    <LoggedIn let:user>
      <AppRailAnchor
        href="/profile"
        name={$t('lang.profile')}
        title={$t('lang.profile')}
        selected={'/profile' === location}
      >
        <ImageLoader let:url src={user?.avatar}>
          <Avatar
            initials={user.email[0]}
            src={url ?? null}
            class="m-auto placeholder-circle"
          />
        </ImageLoader>
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
          <div class="m-4">
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
        <div class="m-4">
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
      name={$t('lang.changeLanguage')}
      title={$t('lang.changeLanguage')}
    >
      <div class="m-4">
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
              class="w-full"
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
                <div class="m-4 text-xl">
                  {language}
                </div>
              </AppRailAnchor>
            </button>
          </form>
        {/each}
      </div>
    {/if}

    <LoggedIn let:logout>
      <AppRailAnchor
        href
        on:click={async (e) => {
          e.preventDefault();
          return await logout().then(async (success) => {
            await popToast('logoutSuccessToast');
            goto('/', {
              replaceState: true,
              noscroll: true,
              keepfocus: true
            });
          });
        }}
        name={$t('lang.logout')}
        title={$t('lang.logout')}
      >
        <div class="flex items-center m-4">
          <i class="m-auto fa-solid fa-sign-out fa-3x fa-fw" />
        </div>
      </AppRailAnchor>
    </LoggedIn>

    <LoggedOut>
      <AppRailAnchor href="/" name={$t('lang.exit')} title={$t('lang.exit')}>
        <div class="flex items-center m-4">
          <i class="m-auto fa-solid fa-sign-out fa-3x fa-fw" />
        </div>
      </AppRailAnchor>
    </LoggedOut>
  </div>
</AppRail>

<style>
</style>
