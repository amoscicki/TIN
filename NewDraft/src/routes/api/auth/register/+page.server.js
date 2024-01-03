import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

import { db } from '$lib/database';

export const load = async () => {
  //xxx
};

const submit = async ({ request }) => {
  const data = await request.formData();
  const email = data.get('email');
  const password = data.get('password');
  const cpassword = data.get('cpassword');

  const formResponse = {
    errors: false,
    invalidInputException: false,
    passwordMismatchException: false,
    emailInUseException: false
  };

  // Server Side Validation

  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    typeof cpassword !== 'string' ||
    !email ||
    !password ||
    !cpassword
  ) {
    formResponse.errors = true;
    formResponse.invalidInputException = true;
  }

  if (password !== cpassword) {
    formResponse.errors = true;
    formResponse.passwordMismatchException = true;
  }

  const userLookup = await db.user.findUnique({ where: { email } });

  if (userLookup) {
    formResponse.errors = true;
    formResponse.emailInUseException = true;
  }

  if (formResponse.errors) {
    return fail(400, formResponse);
  }

  await db.user.create({
    data: {
      email,
      passwordHash: await bcrypt.hash(password, 10),
      userAuthToken: crypto.randomUUID(),
      role: { connect: { name: 'user' } }
    }
  });

  throw redirect(303, '/dashboard');
};

export const actions = { submit };
