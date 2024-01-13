<script>
  import hero from '$lib/assets/hero.webp';
  import { t } from '$lib/translations';
</script>

<div class="relative">
  <img class="absolute inset-8 blur-md" src={hero} alt="hero-blur" />
  <img class="relative opacity-50 inset-16" src={hero} alt="hero" />
  <div class="absolute flex flex-col items-center justify-end inset-8">
    <div class="relative flex flex-col items-center gap-4">
      <h1 class="font-bold text-8xl h1 text-gradient-primary">FlashQuiz</h1>
      <h3 class="font-extrabold h3 text-gradient-secondary">
        {$t('lang.hero-1')}
      </h3>
      <h3 class="font-extrabold h3 text-gradient-secondary">
        {$t('lang.hero-2')}
      </h3>
      <div
        class="absolute p-10 rounded-full opacity-50 -inset-20 bg-surface-700 blur-lg"
      />
    </div>
  </div>
</div>

<style lang="postcss">
  .text-gradient-primary {
    @apply z-10 text-transparent bg-gradient-to-r from-primary-700 to-primary-300 bg-clip-text;
  }
  .text-gradient-secondary {
    @apply z-10 text-transparent bg-gradient-to-r from-secondary-700 to-secondary-300 bg-clip-text;
  }
</style>
