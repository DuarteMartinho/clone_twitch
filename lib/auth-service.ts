import { currentUser } from '@clerk/nextjs';

import { db } from '@/lib/db';

export const getSelf = async () => {
  const self = await currentUser();

  if (!self || !self.username) {
    throw new Error('Not authenticated');
  }

  const user = await db.user.findFirst({
    where: {
      externalUserId: self.id,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

export const getSelfByUsername = async (username: string) => {
  const self = await currentUser();

  if (!self || !self.username) {
    throw new Error('Not authenticated');
  }

  const user = await db.user.findUnique({
    where: {
      username,
    },
    include: {
      stream: true,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  if (user.externalUserId !== self.id || user.username !== self.username) {
    throw new Error('Not authorized');
  }

  return user;
};
