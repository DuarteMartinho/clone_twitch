"use client"

import { Hint } from "@/components/hint";
import { Maximize, Minimize } from "lucide-react";

interface FullscreenControlProps {
    isFullscreen: boolean;
    onToggle: () => void;
}

export const FullscreenControl = ({
    isFullscreen,
    onToggle,
}: FullscreenControlProps) => {
    const Icon = isFullscreen ? Minimize : Maximize;

    const label = isFullscreen ? "Minimize" : "Maximize";

    return (
        <div
            className="flex items-center justify-center gap-4"
        >
            <Hint
                label={label}
                asChild
            >
                <button
                    onClick={onToggle}
                    className="text-white p-1.5 hover:bg-white/10 rounded-large"
                >
                    <Icon
                        className="h-5 w-5"
                    />
                </button>
            </Hint>
        </div>
    )
}