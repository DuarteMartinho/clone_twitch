import { Info } from "lucide-react";
import { useMemo } from "react";
import { Hint } from "../hint";

interface ChatInfoProps {
    isDelayed: boolean;
    isFollowersOnly: boolean;
}

export const ChatInfo = ({
    isDelayed,
    isFollowersOnly
}: ChatInfoProps) => {
    const hint = useMemo(() => {
        if (isDelayed && !isFollowersOnly) {
            return "Chat is delayed by 3 seconds";
        }

        if (isFollowersOnly && !isDelayed) {
            return "Only followers can chat";
        }

        if (isFollowersOnly && isDelayed) {
            return "Only followers can chat and chat is delayed by 3 seconds";
        }

        return "";
    }, [isDelayed, isFollowersOnly]);

    const label = useMemo(() => {
        if (isDelayed && !isFollowersOnly) {
            return "Slow Mode";
        }

        if (isFollowersOnly && !isDelayed) {
            return "Followers Only";
        }

        if (isFollowersOnly && isDelayed) {
            return "Followers Only & Slow Mode";
        }

        return "";
    }, [isDelayed, isFollowersOnly]);

    if (!isDelayed && !isFollowersOnly) {
        return null;
    }

    return (
        <div
            className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2"
        >
            <Hint
                label={hint}
                asChild
            >
                <Info className="h-4 w-4" />
            </Hint>
            <p
                className="text-xs font-semibold"
            >
                {label}
            </p>
        </div>
    )
}