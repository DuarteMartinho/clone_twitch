import { getSelf } from './auth-service';
import { db } from './db';

export const searchStreams = async (q?: string) => {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let streams = [];

  if (userId) {
    streams = await db.stream.findMany({
      where: {
        user: {
          NOT: {
            blocking: {
              some: {
                blockedId: userId,
              },
            },
          },
        },
        OR: [
          {
            name: {
              contains: q,
            },
          },
          {
            user: {
              username: {
                contains: q,
              },
            },
          },
        ],
      },
      select: {
        id: true,
        user: true,
        thumbnailUrl: true,
        isLive: true,
        name: true,
        updatedAt: true,
      },
      orderBy: [
        {
          isLive: 'desc',
        },
        {
          updatedAt: 'desc',
        },
      ],
    });
  } else {
    streams = await db.stream.findMany({
      where: {
        OR: [
          {
            name: {
              contains: q,
            },
          },
          {
            user: {
              username: {
                contains: q,
              },
            },
          },
        ],
      },
      select: {
        id: true,
        user: true,
        thumbnailUrl: true,
        isLive: true,
        name: true,
        updatedAt: true,
      },
      orderBy: [
        {
          isLive: 'desc',
        },
        {
          updatedAt: 'desc',
        },
      ],
    });
  }

  return streams;
};
