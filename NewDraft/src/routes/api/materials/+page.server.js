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

  //TODO: validate data
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

  throw redirect(302, '/dashboard');
};

const update = async ({ request, locals, ...rest }) => {
  const data = await request.formData();
  const materialId = data.get('materialId') ?? null;
  const isPublic = data.get('public') === 'on' ?? null;
  const featured = data.get('featured') === 'on' ?? null;
  const title = data.get('title') ?? null;
  const description = data.get('description') ?? null;

  const loggedInUser = locals?.user?.email ?? null;

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
    console.log('not found');
    formResponse.errors = true;
    formResponse.notFoundException = true;
  }

  if (!currentPublic && isPublic && loggedInUser !== email) {
    console.log('not the owner');
    formResponse.errors = true;
    formResponse.notTheOwnerException = true;
  }

  if (formResponse.errors) {
    return fail(400, formResponse);
  }

  const dataToUpdate = {
    ...{ public: isPublic },
    ...(isPublic && { featured }),
    ...(title && { title }),
    ...(description && { description })
  };

  await db.material.update({
    where: { materialId },
    data: dataToUpdate
  });

  // console.log(rest);
  return { success: true, body: { materialId } };
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
    where: { materialId }
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
    console.log(loggedInUser?.email !== material?.User?.email);
    console.log(loggedInUser?.role !== 'admin');
    console.log(loggedInUser);
    console.log('not the owner');
    formResponse.errors = true;
    formResponse.notTheOwnerException = true;
  }

  if (formResponse.errors) {
    return fail(400, formResponse);
  }

  await db.material.delete({ where: { materialId } });

  throw redirect(302, request.headers.get('referer'));
};

export const actions = { add, update, delete: deleteMaterial };
