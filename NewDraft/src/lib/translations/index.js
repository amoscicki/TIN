import i18n from 'sveltekit-i18n';

const config = {
  loaders: [
    {
      // english
      locale: 'en',
      key: 'lang',
      loader: async () => (await import('./en.json')).default
    },
    // polski
    {
      locale: 'pl',
      key: 'lang',
      loader: async () => (await import('./pl.json')).default
    }
  ]
};

export const { t, locale, locales, loading, loadTranslations } = new i18n(
  config
);
