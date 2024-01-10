import { db } from '$lib/database';
import { redirect } from '@sveltejs/kit';

export const handle = async ({ event, resolve }) => {
  const routename = event.route.id;
  const pathname = event.url.pathname;
  const isProtectedRoute = checkIfProtectedRoute(routename, pathname);
  const userAuthToken = event.cookies.get('fqSessionUserAuthToken');
  let user;

  const locale = 'en';
  event.locals.locale = locale;

  // hydrate client side
  if (userAuthToken && 'undefined' !== userAuthToken) {
    user = await db.user.findUnique({
      where: { userAuthToken },
      select: { email: true, role: true, userId: true }
    });

    if (user) {
      event.locals.user = {
        email: user.email,
        role: user.role.name,
        userId: user.userId
      };
    }
  }

  // early return for api routes
  if (null === routename || routename.startsWith('/api'))
    return await resolve(event, {
      transformPageChunk: ({ html }) => html.replace('%language%', locale)
    });

  if (user && undefined !== user && pathname === '/') {
    console.log('user is logged in, redirecting to dashboard');
    throw redirect(303, '/dashboard');
  }

  console.log(`will check if user can access route [[ ${pathname} ]]`);
  if (
    isProtectedRoute &&
    (!user ||
      !user?.role?.name ||
      !checkAccess(event.locals.user?.role, pathname))
  ) {
    console.log('access denied');
    throw redirect(303, '/dashboard');
  }

  return await resolve(event, {
    transformPageChunk: ({ html }) => html.replace('%language%', locale)
  });
};

const protectedRoutes = [
  {
    route: '/admin',
    roles: ['admin']
  }
];

const checkIfProtectedRoute = (routename, pathname) => {
  if (routename === null || pathname === null) return false;
  return (
    routename.indexOf('(protected)') !== -1 ||
    protectedRoutes.some((protectedRoute) => {
      return protectedRoute.route === pathname;
    })
  );
};

const checkAccess = (role, pathname) => {
  if (
    !protectedRoutes.some((protectedRoute) => protectedRoute.route === pathname)
  )
    return true;
  return protectedRoutes.some((protectedRoute) => {
    return (
      protectedRoute.route === pathname && protectedRoute.roles.includes(role)
    );
  });
};
