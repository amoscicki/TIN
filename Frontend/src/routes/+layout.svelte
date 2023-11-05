<script>
  import "../app.postcss";

  // Floating UI for Popups
  import {
    computePosition,
    autoUpdate,
    flip,
    shift,
    offset,
    arrow,
  } from "@floating-ui/dom";
  import { LightSwitch, storePopup } from "@skeletonlabs/skeleton";
  storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<div
  class="absolute top-0 right-0 z-10 m-2 rounded-full border-2 border-tertiary-500"
>
  <LightSwitch />
</div>
<slot />
