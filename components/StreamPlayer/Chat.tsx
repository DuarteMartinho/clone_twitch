"use client"

import {
    useChat,
    useConnectionState,
    useRemoteParticipant,
} from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { useMediaQuery } from "usehooks-ts";

import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import { useEffect, useMemo, useState } from "react";
import { ChatHeader, ChatHeaderSkeleton } from "./ChatHeader";
import { ChatForm, ChatFormSkeleton } from "./ChatForm";
import { ChatList, ChatListSkeleton } from "./ChatList";
import { ChatCommunity } from "./ChatCommunity";

interface ChatProps {
    hostName: string;
    hostIdentity: string;
    viewerName: string;
    isFollowing: boolean;
    isChatEnabled: boolean;
    isChatDelayed: boolean;
    isChatFollowersOnly: boolean;
}

export const Chat = ({
    hostName,
    hostIdentity,
    viewerName,
    isFollowing,
    isChatEnabled,
    isChatDelayed,
    isChatFollowersOnly
}: ChatProps) => {
    const matches = useMediaQuery("(max-width: 1024px)");
    const {
        variant,
        onExpand
    } = useChatSidebar((state) => state);
    const connectionState = useConnectionState();
    const participant = useRemoteParticipant(hostIdentity);

    const isOnline = connectionState === ConnectionState.Connected && participant;

    const isHidden = !isChatEnabled || !isOnline;

    const [value, setValue] = useState("");
    const { chatMessages: messages, send } = useChat();

    useEffect(() => {
        if (matches) {
            onExpand();
        }
    }, [matches, onExpand]);

    const reversedMessages = useMemo(() => {
        return messages.sort((a, b) => {
            return b.timestamp - a.timestamp;
        });
    }, [messages]);

    const onSubmit = () => {
        if (!send) return;

        send(value);
        setValue("");
    }

    const onChange = (value: string) => {
        setValue(value);
    }

    return (
        <div
            className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]"
        >
            <ChatHeader />
            {variant === ChatVariant.CHAT && (
                <>
                    <ChatList
                        messages={reversedMessages}
                        isHidden={isHidden}
                    />
                    <ChatForm
                        onSubmit={onSubmit}
                        value={value}
                        onChange={onChange}
                        isHidden={isHidden}
                        isFollowersOnly={isChatFollowersOnly}
                        isDelayed={isChatDelayed}
                        isFollowing={isFollowing}
                    />
                </>
            )}
            {
                variant === ChatVariant.COMUUNITY && (
                    <>
                        <ChatCommunity
                            viewerName={viewerName}
                            hostName={hostName}
                            isHidden={isHidden}
                        />
                    </>
                )
            }
        </div>
    )
}

export const ChatSkeleton = () => {
    return (
        <div
            className="flex flex-col border-2 border-l border-b pt-0 h-[calc(100vh-80px)]"
        >
            <ChatHeaderSkeleton />
            <ChatListSkeleton />
            <ChatFormSkeleton />
        </div >
    )
}