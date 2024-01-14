import { db } from '$lib/database';

export const actions = {
  default: async ({ request, locals }) => {
    const formData = await request.formData();
    const name = formData.get('name');
    const avatar =
      formData.get('avatar')?.size > 0 ? formData.get('avatar') : null;
    const avatarBuffer = avatar
      ? Buffer.from(await avatar.arrayBuffer())
      : null;
    const avatarName = avatar ? avatar.name : null;
    const avatarType = avatar ? avatar.type : null;
    console.log(name, avatarName, avatarType);

    await db.user.update({
      where: { email: locals.user.email },
      data: {
        name,
        ...(avatar && { avatar: avatarBuffer }),
        ...(avatar && { avatarName }),
        ...(avatarType && { avatarType })
      }
    });
    return { toastMessage: 'profileUpdatedToast' };
  }
};
