import { db } from '$lib/database';

const protectedRoutes = [
  {
    route: '/dashboard',
    roles: ['user', 'admin']
  },
  {
    route: '/admin',
    roles: ['admin']
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
  const isProtectedRoute = checkIfProtectedRoute(event.url.pathname);
  const userAuthToken = event.cookies.get('fqSessionUserAuthToken');

  if (!userAuthToken) return await resolve(event);

  const user = await db.user.findUnique({
    where: { userAuthToken },
    select: { email: true, role: true }
  });

  if (user) {
    event.locals.user = {
      email: user.email,
      role: user.role.name
    };
  }

  console.log('isProtectedRoute', isProtectedRoute);
  console.log('userAuthToken', userAuthToken);

  // if (isProtectedRoute) {
  //   if (!userAuthToken) {
  //     console.log('login required');
  //     return {
  //       status: 302,
  //       headers: {
  //         location: '/'
  //       }
  //     };
  //   }
  //   const user = await db.user.findUnique({ where: { userAuthToken } });
  //   const role = user?.role?.name;
  //   if (!role || !checkAccess(role, event.url.pathname)) {
  //     console.log('access denied');
  //     return {
  //       status: 403,
  //       headers: {
  //         location: '/'
  //       }
  //     };
  //   }
  // }
};
