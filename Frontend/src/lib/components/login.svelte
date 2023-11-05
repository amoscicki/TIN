<script>
  let error = [];
</script>

<form method="POST">
  <fieldset class="flex flex-col gap-4">
    <div class="input-group input-group-divider grid-cols-[100px_1fr_auto]">
      <label
        for="email"
        class="p-4 text-center font-bold text-xl">email</label
      >
      <input
        name="email"
        type="email"
        placeholder="Enter email address..."
      />
      {#if error && error.includes("email")}
        <a
          href="/"
          title="Username already in use.">(icon)</a
        >
      {/if}
    </div>
    <div class="input-group input-group-divider grid-cols-[100px_1fr_auto]">
      <label
        for="password"
        class="p-4 text-center font-bold text-xl">password</label
      >
      <input
        name="password"
        type="password"
        placeholder="Enter password..."
      />
      {#if error && error.includes("password")}
        <a
          href="/"
          title="Username already in use.">(icon)</a
        >
      {/if}
    </div>
    <button class="btn variant-filled-primary">Log in</button>
  </fieldset>
</form>
