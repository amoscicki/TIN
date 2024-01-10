import { error } from '@sveltejs/kit';
import { db } from '$lib/database.js';

export const load = async ({
  params: { slug },
  url: { searchParams },
  ...rest
}) => {
  const isAdmin = rest.locals.user.role === 'admin';

  const q = parseInt(searchParams.get('q'));

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

  const total = await db.question.count({
    where: {
      materialId: slug
    }
  });

  const getQuestions = async () => {
    const question = await db.question.findMany({
      where: {
        materialId: slug
      },
      include: {
        Answer: {
          where: {
            correct: true
          }
        }
      },
      take: 1,
      skip: q,
      orderBy: {
        questionId: 'asc'
      }
    });
    return question;
  };

  return { question: Promise.resolve(getQuestions()), total: await total };
};
