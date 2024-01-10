<script>
  import '../app.postcss';
  // Font Awesome
  import '@fortawesome/fontawesome-free/css/fontawesome.css';
  import '@fortawesome/fontawesome-free/css/brands.css';
  import '@fortawesome/fontawesome-free/css/solid.css';
  // Highlight JS
  import hljs from 'highlight.js/lib/core';
  import 'highlight.js/styles/github-dark.css';
  import { storeHighlightJs } from '@skeletonlabs/skeleton';
  import xml from 'highlight.js/lib/languages/xml'; // for HTML
  import css from 'highlight.js/lib/languages/css';
  import javascript from 'highlight.js/lib/languages/javascript';
  import typescript from 'highlight.js/lib/languages/typescript';

  hljs.registerLanguage('xml', xml); // for HTML
  hljs.registerLanguage('css', css);
  hljs.registerLanguage('javascript', javascript);
  hljs.registerLanguage('typescript', typescript);
  storeHighlightJs.set(hljs);

  // Floating UI for Popups
  import {
    computePosition,
    autoUpdate,
    flip,
    shift,
    offset,
    arrow
  } from '@floating-ui/dom';
  import { storePopup } from '@skeletonlabs/skeleton';
  storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

  // Filters
  import { filter, Apollo } from '@skeletonlabs/skeleton';

  import { page } from '$app/stores';

  let debugData;
  const resolveData = async () => {
    Promise.all(Object.values($page.data)).then((data) => {
      debugData = data;
    });
  };

  $: resolveData();
</script>

<Apollo />
<slot />
<pre class="p-4 m-4 card variant-glass-secondary">{JSON.stringify(
    debugData,
    null,
    2
  )}</pre>
