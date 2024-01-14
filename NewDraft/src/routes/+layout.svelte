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
  import shell from 'highlight.js/lib/languages/shell';
  import {
    storePopup,
    Apollo,
    Toast,
    Modal,
    initializeStores,
    getModalStore
  } from '@skeletonlabs/skeleton';

  hljs.registerLanguage('xml', xml); // for HTML
  hljs.registerLanguage('css', css);
  hljs.registerLanguage('javascript', javascript);
  hljs.registerLanguage('typescript', typescript);
  hljs.registerLanguage('shell', shell);
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
  storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

  import { page } from '$app/stores';

  let debugData;
  const resolveData = async () => {
    Promise.all(Object.values($page.data)).then((data) => {
      debugData = data;
    });
  };

  initializeStores();

  import ModalDbError from '$lib/components/HomePageLayout/ModalDbError.svelte';
  const modalStore = getModalStore();

  const throwModal = () => {
    const modalRef = { ref: ModalDbError };
    const modal = {
      type: 'component',
      component: modalRef,
      title: 'Full screen Modal',
      backdropClasses: '!p-0'
    };
    modalStore.trigger(modal);
  };

  const dbCheck = async () => {
    const res = await fetch('/api/testdb');
    if (!res.ok) {
      throwModal();
      return console.log(await res.text());
    }
    console.log(await res.text());
  };
  dbCheck();

  const debugOn = false;

  $: resolveData();
</script>

<Apollo />
<Modal />
<Toast />
<slot />

<button
  class="fixed bottom-0 right-0 m-4 text-2xl text-white rounded-full shadow-lg btn variant-ghost-secondary hover:bg-secondary-400 aspect-square"
  on:click={throwModal}
>
  <i class="fas fa-question fa-sm"></i>
</button>

{#if debugOn}
  <pre class="p-4 m-4 card variant-glass-secondary">{JSON.stringify(
      debugData,
      null,
      2
    )}</pre>
{/if}
