<script>
  import { Shell, Hero, FormTabs, Register, Login } from '$lib';
  export let form;
  let snapshotData = {};
  export const snapshot = {
    capture: () => snapshotData,
    restore: (value) => (snapshotData = value)
  };
  const tabs = [
    {
      value: 'login',
      name: 'login',
      label: 'Login',
      component: Login
    },
    {
      value: 'register',
      name: 'register',
      label: 'Register',
      component: Register
    }
  ];
  const TabAnchors = [
    {
      href: '/dashboard',
      label: 'Guest',
      class:
        'overflow-clip text-clip max-h-10 variant-filled-success hover:variant-ghost-success'
    }
  ];
</script>

<Shell>
  <Hero slot="lead" />
  <FormTabs {snapshotData} {tabs} {TabAnchors} props={{ form }} slot="tail" />
</Shell>
