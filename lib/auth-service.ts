import { currentUser } from "@clerk/nextjs";

import { db } from "@/lib/db";

export const getSelf = async () => {
    const self = await currentUser();
    
    if (!self || !self.username) {
        throw new Error("Not authenticated");
    }

    const user = await db.user.findFirst({
        where: {
            externalUserId: self.id
        }
    });

    if (!user) {
        throw new Error("User not found");
    }

    return user;
}