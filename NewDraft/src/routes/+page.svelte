<script>
  import { Shell, Hero, FormTabs, Register, Login } from '$lib';
  export let form;
  const tabs = [
    {
      value: 0,
      name: 'login',
      label: 'Login',
      component: Login
    },
    {
      value: 1,
      name: 'register',
      label: 'Register',
      component: Register
    }
  ];
  const TabAnchors = [
    {
      href: '/dashboard',
      label: 'Try as a guest!',
      class: 'variant-filled-success hover:variant-ghost-success'
    }
  ];
</script>

<Shell>
  <Hero slot="lead" />
  <FormTabs {tabs} {TabAnchors} props={{ form }} slot="tail" />
</Shell>
