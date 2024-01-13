<script>
  import { Shell, Hero, FormTabs, Register, Login } from '$lib';
  import { t } from '$lib/translations';
  export let form;
  let snapshotData = {};
  export const snapshot = {
    capture: () => snapshotData,
    restore: (value) => (snapshotData = value)
  };

  let tabs;
  $: tabs = [
    {
      value: 'login',
      name: 'login',
      label: $t('lang.login'),
      component: Login
    },
    {
      value: 'register',
      name: 'register',
      label: $t('lang.register'),
      component: Register
    }
  ];
  let TabAnchors;
  $: TabAnchors = [
    {
      href: '/dashboard',
      label: $t('lang.guest'),
      class:
        'overflow-clip text-clip max-h-10 variant-filled-success hover:variant-ghost-success'
    }
  ];
</script>

<Shell>
  <Hero slot="lead" />
  <FormTabs {snapshotData} {tabs} {TabAnchors} props={{ form }} slot="tail" />
</Shell>
