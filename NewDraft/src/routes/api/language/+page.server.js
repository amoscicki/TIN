import { fail } from '@sveltejs/kit';

export const actions = {
  default: async ({ request, cookies, ...rest }) => {
    // console.log(rest);
    const supportedLanguages = ['en', 'pl'];
    const formData = await request.formData();
    const code = formData.get('code');
    if (!supportedLanguages.includes(code))
      return fail(418, { message: "I'm a teapot" });
    cookies.set('fqOldLocale', cookies.get('fqLocale'), {
      path: '/',
      maxAge: 60 * 60 * 8
    });
    cookies.set('fqLocale', code, { path: '/', maxAge: 60 * 60 * 8 });
    cookies.set('toastQueue', `language changed to ${code}`, {
      path: '/',
      maxAge: 5
    });
    return {
      status: 200,
      message: 'Language changed successfully'
    };
  }
};
