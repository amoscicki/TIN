export const ssr = false;

import { loadTranslations } from '$lib/translations';

export const load = async ({ url: { pathname }, data: { language } }) => {
  await loadTranslations(language, pathname);
};
