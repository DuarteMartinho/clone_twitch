import { StreamPlayer } from "@/components/StreamPlayer";
import { getSelfByUsername } from "@/lib/auth-service";
import { getUserByUsername } from "@/lib/user-service";
import { currentUser } from "@clerk/nextjs";

interface DashboardHomePageProps {
    params: {
        username: string;
    }
}

const DashboardHomePage = async ({
    params: {
        username
    }
}: DashboardHomePageProps) => {
    const user = await currentUser();
    const self = await getUserByUsername(username);

    if (!self || user?.id !== self.externalUserId || !self.stream) {
        throw new Error("You are not authorized to view this page.");
    }

    return (
        <div className="h-full">
            <StreamPlayer
                user={self}
                stream={self.stream}
                isFollowing={true}
            />
        </div>
    );
}

export default DashboardHomePage;