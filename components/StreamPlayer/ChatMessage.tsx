"use client"

import { format } from "date-fns";
import { stringToColor } from "@/lib/utils";
import { ReceivedChatMessage } from "@livekit/components-react";

interface ChatMessageProps {
    message: ReceivedChatMessage;
}

export const ChatMessage = ({
    message
}: ChatMessageProps) => {
    const color = stringToColor(message.from?.name || "");
    const formattedTimestamp = format(message.timestamp, "HH:mm")

    return (
        <div className="flex gap-2 p-2 rounded-md hover:bg-white/5">
            <p>
                {formattedTimestamp}
            </p>
            <div
                className="flex flex-wrap items-baseline gap-1 grow"
            >
                <p
                    className="text-sm font-semibold whitespace-nowrap"
                >
                    <span
                        className="truncate"
                        style={{
                            color: color
                        }}
                    >
                        {message.from?.name}
                    </span>
                    :
                </p>
                <p
                    className="text-sm break-all"
                >
                    {message.message}
                </p>
            </div>
        </div>
    )
}