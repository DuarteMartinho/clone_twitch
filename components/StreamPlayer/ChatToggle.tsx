"use client"

import { useChatSidebar } from "@/store/use-chat-sidebar";
import {
    ArrowLeftFromLine, ArrowRightFromLine
} from "lucide-react";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";

export const ChatToggle = () => {
    const {
        collapsed,
        onExpand,
        onCollapse,
    } = useChatSidebar((state) => state);

    const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine;

    const onToggle = () => {
        if (collapsed) {
            onExpand();
        } else {
            onCollapse();
        }
    }

    const label = collapsed ? "Expand chat" : "Collapse chat";

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