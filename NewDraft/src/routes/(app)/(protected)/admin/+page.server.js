import { db } from '$lib/database.js';
// import { fail, redirect } from '@sveltejs/kit';

export const load = async () => {
  const getGenres = async () => {
    return await db.genre.findMany();
  };

  const getRoles = async () => {
    return await db.role.findMany();
  };

  const getUsers = async () => {
    const users = await db.user.findMany({
      select: {
        email: true,
        role: { select: { name: true } }
      },
      orderBy: { role: { name: 'asc' } }
    });
    users.forEach((user, i) => {
      users[i].role = user.role.name;
    });
    return await users;
  };

  Buffer.prototype.convertToBase64 = async function () {
    return await this.toString('base64');
  };

  const getMaterials = async () => {
    const materials = await db.material.findMany(
      {
        select: {
          materialId: true,
          title: true,
          description: true,
          public: true,
          featured: true,
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
          sourceType: true,
          User: {
            select: {
              email: true
            }
          }
        }
      },
      { orderBy: { userId: 'asc', materialId: 'desc' } }
    );

    await materials.forEach(async (material, i) => {
      materials[i].image = await material.image.convertToBase64();
      materials[i].source = await material.source.convertToBase64();
      materials[i].genres = material.GenreMaterial.map((genre) => {
        return genre.Genre.name;
      });
      delete materials[i].GenreMaterial;
    });

    return await materials;
  };

  return {
    genres: await getGenres(),
    roles: Promise.resolve(getRoles()),
    users: Promise.resolve(getUsers()),
    materials: Promise.resolve(getMaterials())
  };
};

const addGenre = async ({ request }) => {
  const data = await request.formData();
  const name = data.get('name');

  await db.genre.create({
    data: {
      name
    }
  });

  return { success: true };
};

const removeGenre = async ({ request }) => {
  const data = await request.formData();
  const genreId = parseInt(data.get('genreId'));

  console.log('deleting genreId', genreId);
  await db.genre.delete({
    where: {
      genreId
    }
  });

  return { success: true };
};
export const actions = {
  addGenre,
  removeGenre
};
