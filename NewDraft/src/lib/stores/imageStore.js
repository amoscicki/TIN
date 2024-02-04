import { writable } from 'svelte/store';

const imageStore = writable({
  autoincrement: 1,
  0: new Blob()
});

const cacheImage = ({ image = null, id = 0 }) => {
  if (image !== null)
    if (id === 0)
      imageStore.update((images) => {
        id = images.autoincrement;
      });

  let cachedImage;
  imageStore.update(async (images) => {
    if (images)
      Object.keys(images).map((key) => {
        if (key === id) cachedImage = images[key];
      });

    if (cachedImage === undefined && image !== null)
      imageStore.update((images) => {
        cachedImage = image;
        return { ...images, [id]: cacheImage };
      });
  });
  return { id, cachedImage: cachedImage ?? null };
};

export { imageStore, cacheImage };
