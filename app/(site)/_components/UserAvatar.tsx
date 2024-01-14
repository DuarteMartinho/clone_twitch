import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { LiveBadge } from "@/components/live-badge";

const avatarSizes = cva(
    "",
    {
        variants: {
            size: {
                default: "h-8 w-8",
                lg: "h-14 w-14",
            }
        },
        defaultVariants: {
            size: "default",
        }
    }
)

interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
    username: string;
    imageUrl: string;
    isLive?: boolean;
    showBadge?: boolean;
}

export const UserAvatar = ({
    username,
    imageUrl,
    isLive,
    showBadge,
    size,
}: UserAvatarProps) => {
    const canShowBadge = isLive && showBadge;

    return (
        <div
            className="relative"
        >
            <Avatar
                className={cn(
                    avatarSizes({ size }),
                    isLive && "ring-2 ring-rose-500 border border-background",
                    showBadge && "bg-accent text-accent-foreground"
                )}
            >
                <AvatarImage
                    className="object-cover"
                    src={imageUrl}
                    alt={username}
                />
                <AvatarFallback>
                    {username[0]}
                    {username[username.length - 1]}
                </AvatarFallback>
            </Avatar>
            {
                canShowBadge && (
                    <div
                        className={cn(
                            "absolute -bottom-3 left-1/2 transform -translate-x-1/2"
                        )}
                    >
                        <LiveBadge />
                    </div>
                )
            }
        </div>
    );
}

interface UserAvatarSkeletonProps extends VariantProps<typeof avatarSizes> { }

export const UserAvatarSkeleton = ({
    size,
}: UserAvatarSkeletonProps) => {
    return (
        <Skeleton
            className={cn(
                avatarSizes({ size })
            )}
        />
    );
}