import { db } from '$lib/database';
export const load = async () => {
  const genres = await db.genre.findMany();

  return {
    genres
  };
};
