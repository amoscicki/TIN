<script>
  import { onMount } from 'svelte';
  import { imageStore, cacheImage } from '$lib/stores';
  export let src;
  export let alt;
  export let type = src.split(';')[0].split(':')[1];
  export let b64 = src.split(',')[1];
  const id = `${b64.slice(0, 10)}_${alt?.slice(0, 10) || '__image___'}`;
  export { className as class };
  let className;

  let image;

  const evaluateCache = async () => {
    console.log('istore', $imageStore);
    if (
      Object.keys($imageStore).includes(id) &&
      $imageStore[id] !== undefined
    ) {
      image = $imageStore[id];
      console.log('cached image');
      console.log($imageStore[id]);
      return;
    }
    image = await b64toBlob(b64, type);
    const { cachedImage } = await cacheImage({ id, image });
    image = cachedImage;
  };

  onMount(evaluateCache);

  const b64toBlob = async (base64Data, contentType = 'image/jpeg') => {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  };

  function blobToUrl(blob) {
    if (!blob) return;

    return URL.createObjectURL(blob);
  }
</script>

<slot url={blobToUrl(image)}>
  {#await image}
    <div
      class={'flex text-center items-center justify-center object-center' +
        className ?? ''}
    >
      <i class="fa fa-spinner fa-pulse fa-3x fa-fw" />
    </div>
  {:then res}
    <img
      src={blobToUrl(res)}
      {alt}
      class={className ?? 'w-full aspect-square object-cover'}
    />
  {:catch error}
    <img src="favicon.png" alt={error.message} />
  {/await}
</slot>
