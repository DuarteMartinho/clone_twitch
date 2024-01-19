'use server';

import { revalidatePath } from 'next/cache';

import { blockUser, unblockUser } from '@/lib/block-service';
import { getSelf } from '@/lib/auth-service';
import { RoomServiceClient } from 'livekit-server-sdk';

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

export const onBlock = async (id: string) => {
  try {
    // TODO: adapt to disconnect from livestream
    // TODO: allow ability to kick guests

    const self = await getSelf();

    let blockedUser;
    try {
      blockedUser = await blockUser(id);
    } catch {}

    try {
      await roomService.removeParticipant(self.id, id);
    } catch {}

    revalidatePath(`/u/${self.username}/community`);

    return blockedUser;
  } catch (error) {
    throw new Error('Internal error');
  }
};

export const onUnblock = async (id: string) => {
  try {
    const unblockedUser = await unblockUser(id);

    revalidatePath('/');

    if (unblockedUser) {
      revalidatePath(`/${unblockedUser.blocked.username}`);
    }

    return unblockedUser;
  } catch (error) {
    throw new Error('Internal error');
  }
};
