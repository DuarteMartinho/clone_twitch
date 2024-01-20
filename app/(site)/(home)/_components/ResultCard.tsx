import { Thumbnail, ThumbnailSkeleton } from "@/components/Thumbnail";
import { UserAvatar, UserAvatarSkeleton } from "@/components/UserAvatar";
import { LiveBadge } from "@/components/live-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Stream, User } from "@prisma/client";
import Link from "next/link";

interface ResultCardProps {
    data: {
        id: string;
        name: string;
        thumbnailUrl: string | null;
        isLive: boolean;
        user: User;
    };
}

export const ResultCard = ({ data }: ResultCardProps) => {
    return (
        <Link
            href={`/${data.user.username}`}
        >
            <div
                className="h-full w-full space-y-4"
            >
                <Thumbnail
                    src={data.thumbnailUrl}
                    fallback={data.user.imageUrl}
                    isLive={data.isLive}
                    username={data.user.username}
                />
                <div
                    className="flex gap-x-3"
                >
                    <UserAvatar
                        isLive={data.isLive}
                        imageUrl={data.user.imageUrl}
                        username={data.user.username}
                        showBadge={false}
                    />
                    <div
                        className="flex flex-col text-sm overflow-hidden"
                    >
                        <p
                            className="truncate font-semibold hover:text-blue-500"
                        >
                            {data.name}
                        </p>
                        <p
                            className="text-muted-foreground truncate"
                        >
                            {data.user.username}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export const ResultCardSkeleton = () => {
    return (
        <div
            className="h-full w-full space-y-4"
        >
            <ThumbnailSkeleton />
            <div
                className="flex gap-x-3"
            >
                <UserAvatarSkeleton />
                <div
                    className="flex flex-col gap-y-1"
                >
                    <Skeleton
                        className="h-4 w-32"
                    />
                    <Skeleton
                        className="h-3 w-24"
                    />
                </div>
            </div>
        </div>
    )
}