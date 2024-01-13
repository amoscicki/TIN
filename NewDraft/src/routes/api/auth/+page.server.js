import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

import { db } from '$lib/database';

export const load = async () => {
  throw redirect(302, '/');
};

const register = async ({ cookies, request }) => {
  const data = await request.formData();
  const email = data.get('email');
  const password = data.get('password');
  const cpassword = data.get('cpassword');
  const locale = cookies.get('fqLocale') ?? 'en';

  const formResponse = {
    errors: false,
    invalidInputException: false,
    passwordMismatchException: false,
    passwordComplexityException: false,
    emailInUseException: false
  };

  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    typeof cpassword !== 'string' ||
    !email ||
    !password ||
    !cpassword ||
    !email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  ) {
    formResponse.errors = true;
    formResponse.invalidInputException = true;
  }

  if (password !== cpassword) {
    formResponse.errors = true;
    formResponse.passwordMismatchException = true;
  }

  if (
    !password.match(/[a-z]/g) ||
    !password.match(/[A-Z]/g) ||
    !password.match(/[0-9]/g) ||
    !password.length > 5
  ) {
    formResponse.errors = true;
    formResponse.passwordComplexityException = true;
  }

  const userLookup = await db.user.findUnique({ where: { email } });

  if (userLookup) {
    formResponse.errors = true;
    formResponse.emailInUseException = true;
  }

  if (formResponse.errors) {
    return fail(400, formResponse);
  }

  const userAuthToken = crypto.randomUUID();

  await db.user.create({
    data: {
      email,
      passwordHash: await bcrypt.hash(password, 10),
      userAuthToken,
      role: { connect: { name: 'user' } }
    }
  });

  await cookies.set(
    'fqSessionUserAuthToken',
    userAuthToken,
    generateCookieOptions({ validHours: 8 })
  );

  await cookies.set(
    'fqLocale',
    locale,
    generateCookieOptions({ validDays: 365 })
  );

  return {
    status: 200,
    toastQueue: 'registerSuccessToast'
  };
};

const login = async ({ cookies, request }) => {
  const data = await request.formData();
  const email = data.get('email');
  const password = data.get('password');
  const locale = cookies.get('fqLocale') ?? 'en';
  const formResponse = {
    errors: false,
    invalidInputException: false,
    invalidCredentialsException: false
  };

  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    !email ||
    !password
  ) {
    formResponse.errors = true;
    formResponse.invalidInputException = true;
  }

  const user = await db.user.findUnique({ where: { email } });
  let isValidPass;
  if (user) isValidPass = await bcrypt.compare(password, user.passwordHash);

  if (!user || !isValidPass) {
    formResponse.errors = true;
    formResponse.invalidCredentialsException = true;
  }

  if (formResponse.errors) {
    return fail(400, formResponse);
  }

  const userAuthToken = crypto.randomUUID();

  await db.user.update({
    where: { email },
    data: { userAuthToken }
  });

  await cookies.set(
    'fqSessionUserAuthToken',
    userAuthToken,
    generateCookieOptions({ validHours: 8 })
  );

  await cookies.set(
    'fqLocale',
    locale,
    generateCookieOptions({ validDays: 365 })
  );

  return {
    status: 200,
    toastQueue: 'loginSuccessToast'
  };
};

const generateCookieOptions = ({
  path = '/',
  validSeconds = 0,
  validMinutes = 0,
  validHours = 0,
  validDays = 0,
  httpOnly = true,
  sameSite = 'strict',
  secure = process.env.NODE_ENV === 'production'
}) => {
  return {
    path,
    httpOnly,
    maxAge:
      validSeconds +
      validMinutes * 60 +
      validHours * 60 * 60 +
      validDays * 60 * 60 * 24,
    sameSite,
    secure
  };
};

export const actions = { register, login };
