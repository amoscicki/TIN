<script>
  const options = [
    '',
    'border-2 border-secondary-500 variant-soft-secondary shadow-sm',
    'border-2 border-primary-500 variant-soft-primary'
  ];
  const parseVariant = () => {
    if (typeof setVariant === 'number' && setVariant < options.length)
      return options[setVariant];
    if (typeof setVariant === 'string') return setVariant;
    return options[0];
  };
  export let setVariant;
  let variant = parseVariant();
</script>

<div
  class="{variant} relative flex flex-col items-start gap-4 p-4 m-4 text-left card w-72 h-[30rem] overflow-clip"
>
  <div class="absolute z-10 object-cover -inset-6">
    <slot {variant} name="image" />
  </div>
  <div class="z-20 w-full mt-0 mb-auto space-y-2">
    <slot {variant} name="lead" />
  </div>
  <slot {variant} />
  <div class="z-20 w-full mt-auto mb-0 space-y-2">
    <slot {variant} name="footer" />
  </div>
</div>
