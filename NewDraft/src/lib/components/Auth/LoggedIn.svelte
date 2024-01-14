<script>
  import { invalidateAll } from '$app/navigation';
  import { userStore, resolveCurrentUser } from '$lib/stores';
  export let roles = [];
  let access = false;

  export let dbglbl = '';
  !!dbglbl && console.log(dbglbl, 'userStore unvavail', !$userStore);

  const evaluateRoles = () => {
    if (roles.length === 0) {
      return true;
    }
    if (!$userStore) {
      return false;
    }
    return roles.some((role) => {
      return role === $userStore?.role;
    });
  };

  let user;

  export let refetch = resolveCurrentUser;

  $: if ($userStore) access = evaluateRoles();
  $: if (!$userStore) resolveCurrentUser();

  userStore.subscribe((value) => {
    console.log('userchanged');
    user = value;
  });

  export const logout = async () => {
    await fetch('/api/auth/logout')
      .then((res) => {
        if (res.ok) {
          userStore.set(null);
          invalidateAll();
          return true;
        }
        return false;
      })
      .catch((err) => {
        console.log('logout error', err);
        return false;
      });
  };
</script>

{#if $userStore && !!user.email && access}
  <slot {user} {logout} />
{/if}
