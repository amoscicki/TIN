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

{#if form?.emailInUseException}
  <!-- TODO: Use Skeleton toasts here -->
  <p>Email already used</p>
{/if}
{#if form?.passwordMismatchException}
  <p>Passwords do not match</p>
{/if}
<form
  use:enhance={enhanceHandler}
  class="flex flex-col gap-2 p-4 card"
  action="/api/auth/register?/submit"
  method="POST"
>
  <label class="p-2">
    Email
    <input class="input" type="email" id="email" name="email" required />
    <!-- TODO: Use Skeleton popup store for the fields -->
  </label>

  <label class="p-2">
    Password
    <input
      class="input"
      type="password"
      id="password"
      name="password"
      required
    />
  </label>

  <label class="p-2">
    Confirm password
    <input
      class="input"
      type="password"
      id="cpassword"
      name="cpassword"
      required
    />
  </label>

  <button class="btn variant-filled-primary" type="submit">Register</button>
</form>
