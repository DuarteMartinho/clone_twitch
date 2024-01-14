import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export const getRecommendations = async () => {
    const users = await db.user.findMany({
        orderBy: {
            createdAt: "desc"
        },
    });


    await new Promise((resolve) => setTimeout(resolve, 3000));

    return users;
}