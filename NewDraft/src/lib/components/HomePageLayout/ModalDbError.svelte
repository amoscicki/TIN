<script>
  import { t } from '$lib/translations';
  import { getModalStore } from '@skeletonlabs/skeleton';
  import { CodeBlock } from '@skeletonlabs/skeleton';

  export let parent;

  const modalStore = getModalStore();

  const cBase =
    'bg-surface-100-800-token w-screen h-screen p-4 flex justify-center items-center';
</script>

{#if $modalStore[0]}
  <div class="modal-example-fullscreen opacity-70 {cBase}">
    <div class="flex flex-col space-y-8 text-xl">
      <br />

      <h2 class="h2">{$t('lang.dbInstructionsTitle')}</h2>

      <br />

      <p>{@html $t('lang.dbInstructions-1')}</p>

      <br />

      <CodeBlock
        class="w-full"
        text="text-xl"
        buttonLabel={$t('lang.copy')}
        language="shell"
        code={`DATABASE_URL='mysql://root:12345@localhost:3306/FQ'`}
      />

      <br />

      <p>{@html $t('lang.dbInstructions-2')}</p>

      <br />

      <CodeBlock
        class="w-full"
        text="text-xl"
        buttonLabel={$t('lang.copy')}
        language="shell"
        code={`npx prisma generate`}
      />

      <br />

      <p>{@html $t('lang.dbInstructions-3')}</p>

      <br />

      <CodeBlock
        class="w-full"
        text="text-xl"
        buttonLabel={$t('lang.copy')}
        language="shell"
        code={`mysql -u root -p -h localhost < FQ.sql`}
      />

      <button class="btn variant-filled-primary" on:click={parent.onClose}
        >{$t('lang.close')}</button
      >

      <br />

      <br />

      <div
        class="flex absolute text-xl px-20 py-6 gap-6 w-full bottom-0 [&>a]:font-bold [&>a]:decoration-transparent [&>a]:rounded-3xl variant-soft card justify-center [&>a]:chip [&>a]:text-lg [&>a]:variant-filled-primary"
      >
        {@html $t('lang.demoLink')}
      </div>
    </div>
  </div>
{/if}
