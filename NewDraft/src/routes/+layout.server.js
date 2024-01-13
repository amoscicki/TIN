import { loadTranslations } from '$lib/translations';
export const load = async ({ locals, url: { pathname } }) => {
  await loadTranslations(locals.locale, pathname);
  return {
    ...locals
  };
};
