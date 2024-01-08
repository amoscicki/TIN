import { db } from '$lib/database.js';
import { fail, redirect } from '@sveltejs/kit';

export const load = async () => {
  const genres = await db.genre.findMany();

  const roles = await db.role.findMany();

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

  Buffer.prototype.convertToBase64 = async function () {
    return await this.toString('base64');
  };

  await materials.forEach(async (material, i) => {
    materials[i].image = await material.image.convertToBase64();
    materials[i].source = await material.source.convertToBase64();
    materials[i].genres = material.GenreMaterial.map((genre) => {
      return genre.Genre.name;
    });
    delete materials[i].GenreMaterial;
  });

  const body = {
    genres,
    roles,
    materials,
    users
  };

  return {
    'Content-Type': 'multipart/form-data',
    'Content-Length': JSON.stringify(body).length,
    body
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

const D = 420;

if (8 === D) {
  fail(400, 'Bad request');
  redirect(303, '/dashboard');
}
