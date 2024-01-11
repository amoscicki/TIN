export const ssr = false;

export const load = async ({ locals }) => {
  console.log('layout server load', locals);
  return {
    user: locals.user,
    language: locals.locale,
    toastQueue: locals.toastQueue ?? []
  };
};
