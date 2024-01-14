import { Button } from "@/components/ui/button";
import { followUserAction, isFollowingUser, unfollowUserAction } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";
import { isBlockedByUser } from "@/lib/block-service";

interface UserPageProps {
    params: {
        username: string;
    }
}

const UserPage = async ({
    params: {
        username,
    }
}: UserPageProps) => {
    const user = await getUserByUsername(username);

    if (!user) {
        notFound();
    }

    const isFollowing = await isFollowingUser(user.id);
    const isBlocked = await isBlockedByUser(user.id);

    if (isBlocked) {
        notFound();
    }

    return (
        <div
            className="flex flex-col gap-y-4"
        >
            <p>
                Username: {user.username}
            </p>
            <p>
                UserID: {user.id}
            </p>
            <p>
                {isFollowing ? "Following" : "Not Following"}
            </p>
            <p>
                {isBlocked ? "Blocked" : "Not Blocked"}
            </p>
            <Actions
                isFollowing={isFollowing}
                userId={user.id}
            />
            {/* {
                isFollowing && (
                    <Button
                        onClick={() => {
                            unfollowUserAction(user.id);
                        }}
                    >
                        Unfollow
                    </Button>
                )
            }

            {
                !isFollowing && (
                    <Button
                        onClick={() => {
                            followUserAction(user.id);
                        }}
                    >
                        Follow
                    </Button>
                )
            } */}
        </div>
    );
}

export default UserPage;