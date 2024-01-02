<script>
  import { page } from '$app/stores';

  export let form;
</script>

<h1 class="h1">Login</h1>

<form class="flex flex-col gap-2 p-4 card" action="?/register" method="POST">
  <label class="p-2">
    Email
    <input class="input" type="email" id="email" name="email" required />
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

  {#if form?.loginError}
    <p>Email already used</p>
  {/if}

  <button class="btn variant-filled-primary" type="submit">Register</button>
</form>
