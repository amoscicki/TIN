<svelte:options accessors />

<script>
  import { LoggedIn, toaster } from '$lib';
  import { enhance } from '$app/forms';
  import { Avatar, getToastStore } from '@skeletonlabs/skeleton';
  import { t, locale } from '$lib/translations';
  export let form;
  export let data;

  let refetch;

  const popToast = toaster(getToastStore());

  const enhanceHandler = () => {
    console.log('enhanced');
    return async ({ result }) => {
      console.log('enhanceHandler', result);
      if (result?.status === 200 && result?.data?.toastMessage) {
        popToast(result.data.toastMessage);
        refetch();
      }
    };
  };
</script>

<h1 class="w-full mb-20 prose text-center h1">{$t('lang.profile')}</h1>

<LoggedIn let:user bind:refetch>
  <div class="flex gap-20">
    <div>
      <div class="relative inline-block">
        <span
          class="absolute z-10 w-24 h-24 text-lg badge-icon variant-filled-warning -top-4 -right-4"
          >{user.role}</span
        >
        <Avatar width="w-64" initials={user.email[0]} src={user.avatar} />
      </div>
      <h3 class="m-8 h3">{user.email}</h3>
    </div>
    <form
      use:enhance={enhanceHandler}
      method="POST"
      enctype="multipart/form-data"
      class="space-y-4"
    >
      <label>
        {$t('lang.name')}
        <input
          class="input"
          type="text"
          name="name"
          id="name"
          value={user?.name}
        /></label
      >
      <label>
        {$t('lang.profilePic')}
        <input
          lang={$locale}
          class="input"
          type="file"
          accept="image/*"
          name="avatar"
          id="avatar"
        />
      </label>
      <button class="btn variant-filled-primary" type="submit"
        >{$t('lang.save')}</button
      >
    </form>
  </div>
</LoggedIn>
