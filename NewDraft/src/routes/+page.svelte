<script>
  import { Shell, Hero, FormTabs, Register, Login } from '$lib';
  export let form;
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
  <FormTabs {tabs} {TabAnchors} props={{ form }} slot="tail" />
</Shell>
