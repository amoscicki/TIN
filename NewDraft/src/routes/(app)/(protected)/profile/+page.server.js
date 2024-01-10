import { db } from '$lib/database';

export const load = async (event) => {
  //   console.log('event', event.locals);
};

export const actions = {
  default: async ({ request, locals }) => {
    const formData = await request.formData();
    const name = formData.get('name');
    const avatar = formData.get('avatar');
    const avatarBuffer = Buffer.from(await avatar.arrayBuffer()) ?? null;
    const avatarName = avatar.name ?? null;
    const avatarType = avatar.type ?? null;
    console.log(name, avatarName, avatarType, avatarBuffer.slice(0, 10));

    await db.user.update({
      where: { email: locals.user.email },
      data: {
        name,
        avatar: avatarBuffer,
        avatarName,
        avatarType
      }
    });
  }
};
