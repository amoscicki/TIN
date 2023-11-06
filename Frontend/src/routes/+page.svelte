<script>
  import AuthForm from "../lib/components/AuthForm/AuthForm.svelte";
</script>

<main
  class="flex flex-col-reverse min-h-screen relative md:absolute md:inset-0 md:grid md:grid-flow-col md:grid-cols-2"
>
  <div
    class="grow variant-filled-primary flex flex-col justify-center items-center md:h-full"
  >
    <img
      class="mx-auto w-1/2"
      src="img/hero.png"
      alt="Hero"
    />
    <span
      class="grid grid-flow-row grid-cols-3 grid-rows-3 gap-2 text-left space-y-2 mb-6"
    >
      <h1
        class="h1 [text-shadow:_0_2px_0_rgb(0_0_0_/_50%)] font-bold col-span-3"
      >
        FlashQuiz
      </h1>
      <span
        class="h3 font-extrabold bg-gradient-to-r from-secondary-300 to-tertiary-300 bg-clip-text text-transparent box-decoration-clone"
      >
        Learn Faster,
      </span>
      <span
        class="h3 font-extrabold bg-gradient-to-r from-tertiary-300 to-cyan-300 bg-clip-text text-transparent box-decoration-clone"
      >
        Learn Easier,
      </span>
      <span
        class="h3 font-extrabold bg-gradient-to-r from-cyan-300 to-lime-300 bg-clip-text text-transparent box-decoration-clone"
      >
        Learn Better
      </span>
      <span class="font-semibold col-span-3">
        Organise, Review, Track progress
      </span>
    </span>
  </div>
  <div class="flex flex-col">
    <div class="p-20 text-right">
      <h2 class="h2 font-bold">FlashQuiz</h2>
      <span class="h4">Learning different</span>
    </div>
    <AuthForm />
  </div>
</main>
