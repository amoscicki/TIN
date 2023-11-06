<script>
  import "../app.postcss";
  // Font Awesome
  import "@fortawesome/fontawesome-free/css/fontawesome.css";
  import "@fortawesome/fontawesome-free/css/brands.css";
  import "@fortawesome/fontawesome-free/css/solid.css";
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
  class="absolute top-0 right-0 z-10 m-4 rounded-full border-2 border-tertiary-500"
>
  <LightSwitch />
</div>
<slot />
