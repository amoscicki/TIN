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
          materialId: true,
          title: true,
          description: true,
          GenreMaterial: {
            select: {
              highlighted: true,
              Genre: { select: { name: true } }
            }
          },
          image: true,
          imageName: true,
          imageType: true,
          source: true,
          sourceName: true,
          sourceType: true
        }
      },
      { orderBy: { userId: 'asc', materialId: 'desc' } }
    );

    await owned.forEach(async (material, i) => {
      owned[i].image = await material.image.convertToBase64();
      owned[i].source = await material.source.convertToBase64();
      owned[i].genres = material.GenreMaterial.map((genre) => {
        return {
          name: genre.Genre.name,
          highlighted: genre.highlighted ?? false
        };
      });
      delete owned[i].GenreMaterial;
    });

    return await owned;
  };

  const getFeatured = async () => {
    const featured = await db.material.findMany(
      {
        where: { public: true, featured: true },
        select: {
          materialId: true,
          title: true,
          description: true,
          GenreMaterial: {
            select: {
              highlighted: true,
              Genre: { select: { name: true } }
            }
          },
          image: true,
          imageName: true,
          imageType: true,
          source: true,
          sourceName: true,
          sourceType: true
        }
      },
      { orderBy: { userId: 'asc', materialId: 'desc' } }
    );

    await featured.forEach(async (material, i) => {
      featured[i].image = await material.image.convertToBase64();
      featured[i].source = await material.source.convertToBase64();
      featured[i].genres = material.GenreMaterial.map((genre) => {
        return {
          name: genre.Genre.name,
          highlighted: genre.highlighted ?? false
        };
      });
      delete featured[i].GenreMaterial;
    });

    return await featured;
  };

  return {
    featured: Promise.resolve(getFeatured()),
    owned: Promise.resolve(getOwned())
  };
};
