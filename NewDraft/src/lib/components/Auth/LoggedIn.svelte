<script>
  import { userStore, resolveCurrentUser } from '$lib/stores';
  import { onMount } from 'svelte';
  export let roles = [];
  const user = userStore;
  let access = false;

  onMount(() => {
    resolveCurrentUser();
    access = evaluateRoles();
    console.log('roles', roles, 'access', access);
  });

  const evaluateRoles = () => {
    if (roles.length === 0) {
      return true;
    }
    if (!user) {
      return false;
    }
    return roles.some((role) => {
      return role === $user?.role;
    });
  };
</script>

{#if $user && access}
  <slot user={$user} />
{/if}
