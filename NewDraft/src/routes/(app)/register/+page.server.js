import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

import { db } from '$lib/database';

export const load = async () => {
  //xxx
};

const register = async ({ request }) => {
  const data = await request.formData();
  const email = data.get('email');
  const password = data.get('password');

  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    !email ||
    !password
  ) {
    return fail(400, { invalid: true });
  }

  const userLookup = await db.user.findUnique({ where: { email } });

  if (userLookup) {
    return fail(400, { emailInUseError: true });
  }

  await db.user.create({
    data: {
      email,
      passwordHash: await bcrypt.hash(password, 10),
      userAuthToken: crypto.randomUUID(),
      role: { connect: { name: 'user' } }
    }
  });

  console.log({ email, password });

  throw redirect(303, '/login');
};

export const actions = { register };
