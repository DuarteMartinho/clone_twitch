"use client"

import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import {
    ArrowLeftFromLine, ArrowRightFromLine, MessageSquare, Users
} from "lucide-react";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";

export const ChatVariantToggle = () => {
    const {
        variant,
        onChangeVariant
    } = useChatSidebar((state) => state);

    const isChat = variant === ChatVariant.CHAT;
    const Icon = isChat ? Users : MessageSquare;

    const onToggle = () => {
        const newVariant = isChat ? ChatVariant.COMUUNITY : ChatVariant.CHAT;
        onChangeVariant(newVariant);
    }

    const label = isChat ? "Switch to community" : "Switch to chat";

    return (
        <Hint
            side="left"
            label={label}
            asChild
        >
            <Button
                onClick={onToggle}
                className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
                variant={"ghost"}
            >
                <Icon
                    className="h-4 w-4"
                />
            </Button>
        </Hint>
    )
}