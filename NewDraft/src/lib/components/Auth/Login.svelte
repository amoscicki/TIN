<script>
  import { enhance, applyAction } from '$app/forms';
  export let form;

  //needed for form prop to get correctly
  const enhanceHandler = () => {
    return async ({ result }) => {
      await applyAction(result);
    };
  };

  $: if (form?.errors) {
    console.log('error');
  }

  // TODO: Proper client-side validation component
</script>

<!-- TODO: Use Skeleton toasts here -->
{#if form?.incompleteFormException}
  <p>No email or password</p>
{/if}
{#if form?.invalidCredentialsException}
  <p>Invalid credentials</p>
{/if}

<form
  use:enhance={enhanceHandler}
  class="flex flex-col gap-2 p-4 card"
  action="/api/auth?/login"
  method="POST"
>
  <label class="p-2">
    Email
    <input
      class="input"
      type="email"
      id="email"
      name="email"
      autocomplete="username"
      required
    />
    <!-- TODO: Use Skeleton popup store for the fields -->
  </label>

  <label class="p-2">
    Password
    <input
      class="input"
      type="password"
      id="password"
      name="password"
      autocomplete="current-password"
      required
    />
  </label>

  <button class="btn variant-filled-primary" type="submit">Login</button>
</form>
