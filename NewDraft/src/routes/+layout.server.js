export const ssr = false;

export const load = async ({ locals }) => {
  return {
    user: locals.user,
    language: locals.locale
  };
};
