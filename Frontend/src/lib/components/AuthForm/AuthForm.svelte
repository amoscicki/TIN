<script>
  import { Tab, TabAnchor, TabGroup } from "@skeletonlabs/skeleton";
  import Login from "./Login.svelte";
  import Register from "./Register.svelte";
  let tabSet = "login";
</script>

<div class="flex-grow p-20 flex">
  <TabGroup
    justify="justify-center gap-4"
    active="variant-filled-primary"
    hover="hover:variant-glass-primary"
    rounded="rounded-full"
    border=""
    class="flex-grow md:mt-40 mb-auto"
  >
    <Tab
      bind:group={tabSet}
      name="login"
      value={"login"}
    >
      <span>Login</span>
    </Tab>
    <Tab
      bind:group={tabSet}
      name="login"
      value={"register"}>Register</Tab
    >
    <TabAnchor
      href="/dashboard"
      class="variant-filled-success hover:variant-glass-success"
      >Try for free</TabAnchor
    >

    <svelte:fragment slot="panel">
      {#if tabSet === "login"}
        <Login />
      {:else if tabSet === "register"}
        <Register />
      {/if}
    </svelte:fragment>
  </TabGroup>
</div>
