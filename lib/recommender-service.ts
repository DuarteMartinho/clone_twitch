import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export const getRecommendations = async () => {
    const users = await db.user.findMany({
        orderBy: {
            createdAt: "desc"
        },
    });

    return users;
}