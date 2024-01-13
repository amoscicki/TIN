import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/database';

export const load = async () => {
  throw redirect(302, '/');
};

const add = async ({ request, locals }) => {
  const formData = await request.formData();
  const genres = formData.getAll('genres').reduce((acc, genreId) => {
    acc.push(parseInt(genreId));
    return acc;
  }, []);
  const questions = JSON.parse(formData.get('questions'));
  const isPublic = formData.get('public') === 'on';
  const title = formData.get('title');
  const description = formData.get('description');
  const image = formData.get('image');
  const imageBuffer = Buffer.from(await image.arrayBuffer()) ?? null;
  const imageName = image.name ?? null;
  const imageType = image.type ?? null;
  const source = formData.get('source');
  const sourceBuffer = Buffer.from(await source.arrayBuffer()) ?? null;
  const sourceName = source.name ?? null;
  const sourceType = source.type ?? null;

  const formResponse = {
    errors: false,
    missingTitleException: false,
    missingDescriptionException: false,
    missingQAException: false
  };

  if (!title) {
    formResponse.errors = true;
    formResponse.missingTitleException = true;
  }

  if (!description) {
    formResponse.errors = true;
    formResponse.missingDescriptionException = true;
  }

  if (!questions || questions.length === 0) {
    formResponse.errors = true;
    formResponse.missingQAException = true;
  }

  if (formResponse.errors) {
    return fail(400, formResponse);
  }

  const material = await db.material.create({
    data: {
      public: isPublic,
      title,
      description,
      User: { connect: { email: locals.user.email } },
      image: imageBuffer,
      imageName,
      imageType,
      source: sourceBuffer,
      sourceName,
      sourceType
    }
  });

  await db.genreMaterial.createMany({
    data: genres.map((genreId) => {
      return {
        genreId,
        materialId: material.materialId
      };
    })
  });

  questions.forEach(async (question) => {
    await db.answer.create({
      data: {
        answer: question.answer,
        question: {
          create: {
            question: question.question,
            materialId: material.materialId
          }
        }
      }
    });
  });

  return { status: 200, toastMessage: 'materialAddedToast' };
};

const update = async ({ request, locals }) => {
  const data = await request.formData();
  const genres = data.getAll('genres').reduce((acc, genreId) => {
    acc.push(parseInt(genreId));
    return acc;
  }, []);
  const materialId = data.get('materialId') ?? null;
  const isPublic = data.get('public') === 'on' ?? null;
  const featured = data.get('featured') === 'on' ?? null;
  const title = data.get('title') ?? null;
  const description = data.get('description') ?? null;
  const image = 0 !== data.get('image')?.size ? data.get('image') : null;
  const source = 0 !== data.get('source')?.size ? data.get('source') : null;
  const imageBuffer = image ? Buffer.from(await image?.arrayBuffer()) : null;
  const imageName = image ? image?.name : null;
  const imageType = image ? image?.type : null;
  const sourceBuffer = source ? Buffer.from(await source?.arrayBuffer()) : null;
  const sourceName = source ? source?.name : null;
  const sourceType = source ? source?.type : null;
  const questions = JSON.parse(data.get('questions')) ?? null;
  const loggedInUser = locals?.user?.email ?? null;
  const isAdmin = locals?.user?.role === 'admin';

  console.log({ isAdmin });

  const formResponse = {
    errors: false,
    invalidDataException: false,
    notTheOwnerException: false,
    notFoundException: false
  };

  if (!materialId) {
    formResponse.errors = true;
    formResponse.invalidDataException = true;
  }

  const {
    User: { email },
    public: currentPublic,
    featured: currentFeatured
  } = await db.material.findFirst({
    where: { materialId },
    select: { User: { select: { email: true } }, public: true, featured: true }
  });

  if (
    undefined === email ||
    undefined === currentPublic ||
    undefined === currentFeatured
  ) {
    // console.log('not found');
    formResponse.errors = true;
    formResponse.notFoundException = true;
  }

  if (!isAdmin && loggedInUser !== email) {
    // console.log('not the owner');
    formResponse.errors = true;
    formResponse.notTheOwnerException = true;
  }

  if (formResponse.errors) {
    return fail(400, formResponse);
  }

  const materialDataToUpdate = {
    public: isPublic,
    ...(currentPublic && { featured }),
    ...(!isPublic && { featured: false }),
    ...(title && { title }),
    ...(description && { description }),
    ...(image && { image: imageBuffer, imageName, imageType }),
    ...(source && { source: sourceBuffer, sourceName, sourceType })
  };
  console.log({ materialDataToUpdate });

  if (!!questions) {
    console.log('hi we will be trying to update quesitons');

    const questionsToUpdate = [];
    const questionsToCreate = [];

    questions.forEach((question) => {
      if (question.questionId) return questionsToUpdate.push(question);
      questionsToCreate.push(question);
    });

    // delete questions that are not present in questionsToUpdate
    // const quesitonsToDelete = await db.question.findMany({
    await db.question.deleteMany({
      where: {
        AND: {
          materialId,
          NOT: {
            questionId: {
              in: questionsToUpdate.map((question) => question.questionId)
            }
          }
        }
      }
    });

    // update questions inside questionsToUpdate
    await Promise.all(
      questionsToUpdate.map(async (question) => {
        await db.question.update({
          where: { questionId: question.questionId },
          data: { question: question.question }
        });
        await db.answer.update({
          where: { answerId: question.answerId },
          data: { answer: question.answer }
        });
      })
    );

    // create questions inside questionsToCreate
    await Promise.all(
      questionsToCreate.map(async (question) => {
        await db.answer.create({
          data: {
            answer: question.answer,
            question: {
              create: {
                question: question.question,
                materialId: materialId
              }
            }
          }
        });
      })
    );
  }

  // // update genres
  // await db.genreMaterial.deleteMany({ where: { materialId } });
  // await db.genreMaterial.createMany({
  //   data: genres.map((genreId) => {
  //     return {
  //       genreId,
  //       materialId
  //     };
  //   })
  // });

  await db.material.update({
    where: { materialId },
    data: materialDataToUpdate
  });

  const updated = await db.material.findFirst({
    where: { materialId },
    select: {
      materialId: true,
      title: true,
      description: true,
      public: true,
      featured: true
    }
  });

  console.log({
    materialDataToUpdate,
    updated
  });

  return {
    material: updated,
    status: 200,

    toastMessage: 'materialUpdatedToast'
  };
};

const deleteMaterial = async ({ request, locals }) => {
  const data = await request.formData();
  const materialId = data.get('materialId') ?? null;

  const loggedInUser = locals?.user ?? null;

  const formResponse = {
    errors: false,
    invalidDataException: false,
    notTheOwnerException: false,
    notFoundException: false
  };

  if (!materialId) {
    console.log('invalid data');
    formResponse.errors = true;
    formResponse.invalidDataException = true;
  }

  const material = await db.material.findFirst({
    where: { materialId },
    include: { User: { select: { email: true } } }
  });

  if (!material) {
    console.log('not found');
    formResponse.errors = true;
    formResponse.notFoundException = true;
  }

  if (
    loggedInUser?.email !== material?.User?.email &&
    loggedInUser?.role !== 'admin'
  ) {
    formResponse.errors = true;
    formResponse.notTheOwnerException = true;
  }

  if (formResponse.errors) {
    return fail(400, formResponse);
  }

  await db.material.delete({ where: { materialId } });

  return {
    status: 200,
    materialId: materialId,
    toastMessage: 'materialDeletedToast'
  };
};

export const actions = { add, update, delete: deleteMaterial };
