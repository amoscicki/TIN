import { db } from '$lib/database';
import { redirect } from '@sveltejs/kit';

const protectedRoutes = [
  {
    route: '/admin',
    roles: ['admin']
  },
  {
    route: '/stats',
    roles: ['user', 'admin']
  }
];

const checkIfProtectedRoute = (route) => {
  return protectedRoutes.some((protectedRoute) => {
    return protectedRoute.route === route;
  });
};

const checkAccess = (role, route) => {
  return protectedRoutes.some((protectedRoute) => {
    return (
      protectedRoute.route === route && protectedRoute.roles.includes(role)
    );
  });
};

export const handle = async ({ event, resolve }) => {
  const { pathname } = event.url;
  let user;

  const isProtectedRoute = checkIfProtectedRoute(pathname);
  const userAuthToken = event.cookies.get('fqSessionUserAuthToken');

  console.log('userAuthToken', userAuthToken);

  // hydrate client side
  if (userAuthToken && 'undefined' !== userAuthToken) {
    user = await db.user.findUnique({
      where: { userAuthToken },
      select: { email: true, role: true }
    });

    if (user) {
      event.locals.user = {
        email: user.email,
        role: user.role.name
      };
    }
  }

  if (user && pathname === '/') {
    console.log('user is logged in, redirecting to dashboard');
    throw redirect(303, '/dashboard');
  }

  console.log(`will check if user can access route ${pathname} now`);
  if (
    isProtectedRoute &&
    (!user ||
      !user.role.name ||
      !checkAccess(event.locals.user?.role, pathname))
  ) {
    console.log('access denied');
    throw redirect(303, '/dashboard');
  } else return await resolve(event);
};
