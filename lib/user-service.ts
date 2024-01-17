import { db } from '@/lib/db';

export const getUserByUsername = async (username: string) => {
  const user = await db.user.findFirst({
    where: {
      username,
    },
  });

  return user;
};

export const getUserById = async (id: string) => {
  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};
