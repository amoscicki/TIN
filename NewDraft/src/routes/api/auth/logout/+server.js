import { redirect } from '@sveltejs/kit';

export const GET = async (event) => {
  event.cookies.set('fqSessionUserAuthToken', '', { path: '/', maxAge: -1 });
  event.cookies.set('toastQueue', 'Logged Out successfully!', {
    path: '/',
    maxAge: 5
  });
  throw redirect(302, '/');
};
