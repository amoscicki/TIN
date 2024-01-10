<script>
</script>

<main
  class="relative flex flex-wrap justify-center w-screen h-dvh overflow-clip"
>
  <div class="absolute w-full lg:top-0 lg:w-1/2 lg:relative">
    <slot name="lead" />
  </div>
  <div
    class="max-lg:absolute max-lg:px-[20%] max-lg:grid max-lg:w-full max-lg:place-items-center lg:w-1/2 lg:relative lg:flex lg:items-start max-sm:top-14 top-60 lg:justify-center"
  >
    <slot name="tail" />
  </div>
</main>
