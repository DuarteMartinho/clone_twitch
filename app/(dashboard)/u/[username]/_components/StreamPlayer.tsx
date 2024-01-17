"use client"

import { useViewerToken } from "@/hooks/useViewerToken";
import { Stream, User } from "@prisma/client"

interface StreamPlayerProps {
    user: (User & {
        stream: Stream | null;
    })
    stream: Stream;
    isFollowing: boolean;
}

export const StreamPlayer = ({
    user,
    stream,
    isFollowing
}: StreamPlayerProps) => {
    const {
        token,
        name,
        identity,
    } = useViewerToken(user.id);

    if (!token || !name || !identity) {
        <div>
            Cannot watch the stream
        </div>
    }

    return (
        <div>
            <h1>Stream Player</h1>
        </div>
    )
}