import { db } from '$lib/database.js';

export const load = async ({ locals }) => {
  const currentUser = locals?.user?.email ?? '';

  Buffer.prototype.convertToBase64 = async function () {
    return await this.toString('base64');
  };

  const getOwned = async () => {
    const owned = await db.material.findMany(
      {
        where: { User: { email: currentUser } },
        select: {
          title: true,
          GenreMaterial: {
            select: {
              Genre: { select: { name: true } }
            }
          },
          image: true,
          imageName: true,
          imageType: true
        }
      },
      { orderBy: { userId: 'asc', materialId: 'desc' } }
    );

    await owned.forEach(async (material, i) => {
      owned[i].image = await material.image.convertToBase64();
      owned[i].genres = material.GenreMaterial.map((genre) => {
        return genre.Genre.name;
      });
      delete owned[i].GenreMaterial;
    });

    return await owned;
  };

  return {
    owned: Promise.resolve(getOwned())
  };
};
