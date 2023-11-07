<script>
  export let src;
  export let alt;
  export { className as class };
  let className;

  let image = new Promise(() => {});

  import { onMount } from "svelte";
  onMount(async () => {
    const cacheImage = async (url) => {
      const res = await fetch(url);
      const blob = await res.blob();

      return new Promise((resolve) => {
        let reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject("Error:", error);
      });
    };
    image = await cacheImage(src);
  });
</script>

{#await image}
  <div
    class={"flex text-center items-center justify-center object-center" +
      className ?? ""}
  >
    <i class="fa fa-spinner fa-pulse fa-3x fa-fw" />
  </div>
{:then res}
  <img
    src={res}
    {alt}
    class={className ?? "w-48 aspect-square object-cover"}
  />
{:catch error}
  <img
    src="favicon.png"
    alt={error.message}
  />
{/await}
