import { fail } from '@sveltejs/kit';

export const actions = {
  default: async ({ request, cookies }) => {
    const supportedLanguages = ['en', 'pl'];
    const formData = await request.formData();
    const code = formData.get('code');
    if (!supportedLanguages.includes(code))
      return fail(418, { message: "I'm a teapot" });

    cookies.set('fqLocale', code, { path: '/', maxAge: 60 * 60 * 24 * 365 });

    return {
      status: 200,
      toastQueue: 'langChangedToast'
    };
  }
};
