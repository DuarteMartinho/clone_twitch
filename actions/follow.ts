'use server';

import { followUserAction, unfollowUserAction } from '@/lib/follow-service';
import { revalidatePath } from 'next/cache';

export const onFollow = async (id: string) => {
  try {
    const followedUser = await followUserAction(id);
    revalidatePath('/');
    if (followedUser) {
      revalidatePath(`/${followedUser.following.username}`);
    }
    return followedUser;
  } catch (error) {
    throw new Error('Internal error');
  }
};

export const onUnfollow = async (id: string) => {
  try {
    const unfollowedUser = await unfollowUserAction(id);
    revalidatePath('/');
    if (unfollowedUser) {
      revalidatePath(`/${unfollowedUser.following.username}`);
    }
    return unfollowedUser;
  } catch (error) {
    throw new Error('Internal error');
  }
};
