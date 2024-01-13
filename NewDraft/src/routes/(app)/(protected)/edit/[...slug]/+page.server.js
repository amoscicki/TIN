import { error } from '@sveltejs/kit';
import { db } from '$lib/database.js';

export const load = async ({ params: { slug }, ...rest }) => {
  const isAdmin = rest.locals.user.role === 'admin';

  if (slug.length < 1) return error(404, { message: 'Not found' });

  const exists = await db.material.count({
    where: {
      materialId: slug,
      OR: !isAdmin
        ? [{ public: true }, { userId: rest.locals.user.userId }]
        : [{ materialId: slug }]
    }
  });

  if (exists === 0) return error(404, { message: 'Not found' });

  const materials = await db.material.findMany({
    where: {
      materialId: slug
    },
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
      Question: {
        select: {
          questionId: true,
          question: true,
          Answer: {
            select: {
              answerId: true,
              answer: true,
              correct: true
            },
            where: {
              correct: true
            }
          }
        }
      },

      image: true,
      imageName: true,
      imageType: true,
      source: true,
      sourceName: true,
      sourceType: true
    }
  });

  Buffer.prototype.convertToBase64 = async function () {
    return await this.toString('base64');
  };

  const getMaterials = async () => {
    await materials.forEach(async (material, i) => {
      materials[i].image = await material.image.convertToBase64();
      materials[i].source = await material.source.convertToBase64();
      materials[i].genres = material.GenreMaterial.map((genre) => {
        return genre.Genre.name;
      });
      delete materials[i].GenreMaterial;
      materials[i].questions = material.Question.map((question) => {
        return {
          questionId: question.questionId,
          question: question.question,
          answerId: question.Answer[0].answerId,
          answer: question.Answer[0].answer
        };
      });
      delete materials[i].Question;
    });

    return await materials[0];
  };

  const genres = await db.genre.findMany();

  return {
    genres,
    material: await getMaterials()
  };
};
