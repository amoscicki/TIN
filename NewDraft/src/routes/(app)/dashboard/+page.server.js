import { db } from '$lib/database.js';

export const load = async ({ locals }) => {
  const currectUser = locals.user.email;

  const featured = await db.material.findMany(
    {
      where: { public: true, featured: true },
      select: {
        materialId: true,
        title: true,
        description: true,
        GenreMaterial: {
          select: {
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

  const owned = await db.material.findMany(
    {
      where: { User: { email: currectUser } },
      select: {
        materialId: true,
        title: true,
        description: true,
        GenreMaterial: {
          select: {
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

  Buffer.prototype.convertToBase64 = async function () {
    return await this.toString('base64');
  };

  await owned.forEach(async (material, i) => {
    owned[i].image = await material.image.convertToBase64();
    owned[i].source = await material.source.convertToBase64();
    owned[i].genres = material.GenreMaterial.map((genre) => {
      return genre.Genre.name;
    });
    delete owned[i].GenreMaterial;
  });

  await featured.forEach(async (material, i) => {
    featured[i].image = await material.image.convertToBase64();
    featured[i].source = await material.source.convertToBase64();
    featured[i].genres = material.GenreMaterial.map((genre) => {
      return genre.Genre.name;
    });
    delete featured[i].GenreMaterial;
  });

  const body = {
    owned,
    featured
  };

  return {
    'Content-Type': 'multipart/form-data',
    'Content-Length': JSON.stringify(body).length,
    body
  };
};
