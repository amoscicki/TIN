import { redirect } from '@sveltejs/kit';

export const GET = async (event) => {
  event.cookies.set('fqSessionUserAuthToken', '', { path: '/', maxAge: -1 });
  throw redirect(302, '/');
};
