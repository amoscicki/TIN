import { t } from '$lib/translations';

export const toaster = (store) => async (m) =>
  store.trigger({
    message: t.get(`lang.${m}`),
    background:
      'bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white',
    classes: 'border-4 border-purple-500'
  });
