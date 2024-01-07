export const GET = async (event) => {
  const user = JSON.stringify(event.locals?.user || null);
  return new Response(user);
};
