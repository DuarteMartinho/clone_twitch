"use client"

import { Hint } from "@/components/hint";
import { Slider } from "@/components/ui/slider";
import { Volume1, Volume2, VolumeX } from "lucide-react";

interface VolumeControlProps {
    value: number;
    onToggle: () => void;
    onChange: (value: number) => void;
}

export const VolumeControl = ({
    value,
    onToggle,
    onChange
}: VolumeControlProps) => {
    const isMuted = value === 0;
    const isAboveHalf = value > 50;

    let Icon = Volume1;

    if (isMuted) {
        Icon = VolumeX;
    } else if (isAboveHalf) {
        Icon = Volume2;
    }

    const label = isMuted ? "Unmute" : "Mute";

    const handleChange = (value: number[]) => {
        onChange(value[0]);
    }

    return (
        <div
            className="flex items-center gap-2"
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
            <Slider
                value={[value]}
                onValueChange={handleChange}
                className="w-[8rem] cursor-pointer"
                step={1}
                min={0}
                max={100}
            />
        </div>
    )
}