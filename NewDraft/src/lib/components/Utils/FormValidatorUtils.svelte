<script>
  export let form;
  import { popup } from '@skeletonlabs/skeleton';
  import { Toaster } from '$lib';

  let messages = [];

  export let toaster;
  export let warningInfo = {
    override: false,
    overrideMessage: 'CLIENTSIDE_VALIDATION_ERROR',
    tag: 'Example',
    message: 'Example message'
  };

  $: if (toaster && form?.errors) {
    const newMessages = [];
    console.log(form);
    messages = Object.keys(form).map((message) => {
      if (message === 'errors') return;
      if (form[message]) newMessages.push(message);
    });
    messages = newMessages;
  }

  $: showErrorIndicator = () => {
    return (
      (form && form[warningInfo.tag]) ||
      (warningInfo?.override && warningInfo?.overrideMessage)
    );
  };

  const popupOptions = {
    event: 'hover',
    target: `${warningInfo.tag}`,
    placement: 'top'
  };
</script>

{#if toaster && undefined !== toaster && null !== toaster}
  <Toaster {messages} />
{:else}
  <div class="input-group input-group-divider grid-cols-[1fr_auto]">
    <slot />
    {#if showErrorIndicator()}
      <button
        class=" btn-icon-base overflow-clip max-h-10 [&>*]:pointer-events-none"
        on:click|preventDefault={() => {}}
        use:popup={popupOptions}
      >
        <i
          class="animate-pulse fas fa-xl fa-exclamation-circle text-warning-500"
        />
      </button>
    {/if}
  </div>
{/if}

<div data-popup={warningInfo.tag}>
  <div class="p-4 card variant-filled-warning">
    <p>
      {warningInfo?.override
        ? warningInfo?.overrideMessage
        : warningInfo?.message}
    </p>

    <div class="arrow variant-filled-warning" />
  </div>
</div>
