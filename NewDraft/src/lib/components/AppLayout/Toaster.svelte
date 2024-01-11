<script>
  import { page } from '$app/stores';
  import { getToastStore } from '@skeletonlabs/skeleton';

  const toastStore = getToastStore();
  export const toast = (message) => {
    const toasSettings = {
      message: message,
      ...toastStyles
    };
    toastStore.trigger(toasSettings);
  };

  export let messages = [];
  let language = $page.data.language;

  const applyLang = (msg) => {
    //needs implementation
    console.log(language);
    return msg;
  };

  export let toastStyles = {
    background:
      'bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white',
    classes: 'border-4 border-purple-500'
  };

  $: if (messages.length > 0) for (const msg of messages) toast(applyLang(msg));
</script>
