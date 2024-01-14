import { db } from '@/lib/db';
import { getSelf } from '@/lib/auth-service';

export const getRecommendations = async () => {
  let userId;
  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  if (userId) {
    const users = await db.user.findMany({
      where: {
        AND: [
          {
            NOT: {
              id: userId,
            },
          },
          {
            NOT: {
              followedBy: {
                some: {
                  followerId: userId,
                },
              },
            },
          },
          {
            NOT: {
              blocking: {
                some: {
                  blockedId: userId,
                },
              },
            },
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return users;
  } else {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return users;
  }
};
