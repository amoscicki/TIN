export const GET = async (event) => {
  event.cookies.set('fqSessionUserAuthToken', '', { path: '/', maxAge: -1 });
  return new Response('ok');
};
