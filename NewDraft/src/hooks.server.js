import { db } from '$lib/database';
import { redirect } from '@sveltejs/kit';

export const handle = async ({ event, resolve, ...rest }) => {
  const routename = event.route.id;
  const pathname = event.url.pathname;
  const isProtectedRoute = checkIfProtectedRoute(routename, pathname);
  const userAuthToken = event.cookies.get('fqSessionUserAuthToken');
  const toastQueue = event.cookies.get('toastQueue') ?? [];
  const locale = event.cookies.get('fqLocale') ?? [];
  const oldLocale = event.cookies.get('fqOldLocale') ?? '';

  event.cookies.set('fqOldLocale', '', { path: '/', maxAge: -1 });

  let user;

  event.locals.locale = locale;

  event.locals.toastQueue = toastQueue;

  // hydrate client side
  if (userAuthToken && 'undefined' !== userAuthToken) {
    user = await db.user.findUnique({
      where: { userAuthToken },
      select: {
        email: true,
        role: true,
        userId: true,
        avatar: true,
        name: true,
        avatarName: true,
        avatarType: true
      }
    });

    const avatarBase64 =
      user.avatar?.length > 0
        ? `data:${user.avatarType};base64,${user.avatar?.toString('base64')}`
        : '';

    if (user) {
      if (
        !event.locals.user?.avatar ||
        user.avatar !== avatarBase64 ||
        !event.locals.user.name ||
        event.locals.user.name !== user.name
      )
        event.locals.user = {
          email: user.email,
          role: user.role.name,
          userId: user.userId,
          avatar: avatarBase64,
          name: user.name
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

  const eventResolveOptions = {
    transformPageChunk: ({ html }) => {
      console.log(oldLocale);
      return html
        .replace('%language%', locale)
        .replace(`lang="${oldLocale}"`, `lang="${locale}"`);
    }
  };

  const response = await resolve(event, eventResolveOptions);

  return response;
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
