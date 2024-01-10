<script>
  import { popup } from '@skeletonlabs/skeleton';

  const popupOptions = {
    event: 'hover',
    target: 'test',
    placement: 'right'
  };
</script>

<div class="m-64">
  <div class="input-group input-group-divider grid-cols-[1fr_auto]">
    <input
      class="input"
      type="password"
      id="cpassword"
      name="cpassword"
      autocomplete="new-password"
      required
    />

    <button
      class=" btn-icon-base [&>*]:pointer-events-none"
      on:click|preventDefault={() => {}}
      use:popup={popupOptions}
    >
      <i class="animate-pulse fas fa-xl fa-exclamation-circle text-error-500" />
    </button>
  </div>
  <div data-popup="test">
    <div class="p-4 card variant-ghost-warning">
      <p>MESSAGE</p>
    </div>
  </div>
</div>
