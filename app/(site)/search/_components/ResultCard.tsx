import { Thumbnail, ThumbnailSkeleton } from "@/components/Thumbnail";
import { UserAvatar, UserAvatarSkeleton } from "@/components/UserAvatar";
import { Verified } from "@/components/Verified";
import { LiveBadge } from "@/components/live-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Stream, User } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

interface ResultCardProps {
    data: {
        id: string;
        name: string;
        thumbnailUrl: string | null;
        isLive: boolean;
        user: User;
        updatedAt: Date;
    };
}

export const ResultCard = ({ data }: ResultCardProps) => {
    return (
        <Link
            href={`/${data.user.username}`}
        >
            <div
                className="w-full flex gap-x-4"
            >
                <div
                    className="relative h-[9rem] w-[16rem]"
                >
                    <Thumbnail
                        src={data.thumbnailUrl}
                        fallback={data.user.imageUrl}
                        isLive={data.isLive}
                        username={data.user.username}
                    />
                </div>
                <div
                    className="space-y-2"
                >
                    <div
                        className="flex items-center gap-x-2"
                    >
                        <p
                            className="truncate text-lg font-bold hover:text-blue-500 cursor-pointer"
                        >
                            {data.user.username}
                        </p>
                        <Verified />
                    </div>
                    <p
                        className="text-muted-foreground text-md"
                    >
                        {data.name}
                    </p>
                    <p
                        className="text-muted-foreground text-sm"
                    >
                        {formatDistanceToNow(new Date(data.updatedAt))}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export const ResultCardSkeleton = () => {
    return (
        <div
            className="w-full flex gap-x-4"
        >
            <div
                className="relative h-[9rem] w-[16rem]"
            >
                <ThumbnailSkeleton />
            </div>
            <div
                className="space-y-2"
            >
                <Skeleton
                    className="h-4 w-32"
                />
                <Skeleton
                    className="h-3 w-24"
                />
                <Skeleton
                    className="h-3 w-12"
                />
            </div>
        </div>
    )
}