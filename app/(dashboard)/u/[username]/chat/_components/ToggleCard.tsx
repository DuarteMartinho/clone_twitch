"use client"

import { useTransition } from "react";

import { updateStream } from "@/actions/stream";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

type FieldTypes = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly"

interface ToggleCardProps {
    field: FieldTypes;
    label: string;
    description: string;
    value: boolean;
}

export const ToggleCard = ({
    field,
    label,
    description,
    value,
}: ToggleCardProps) => {
    const [isPending, startTransition] = useTransition();

    const handleChange = async (newValue: boolean) => {
        startTransition(() => {
            updateStream({ [field]: newValue })
                .then(() => {
                    toast.success("Stream updated!");
                }).catch((error) => {
                    toast.error("Something went wrong!");
                });
        });
    }

    return (
        <div
            className="rounded-xl bg-muted p-6"
        >
            <div
                className="flex items-center justify-between"
            >
                <div>
                    <p
                        className="font-semibold shrink-0"
                    >
                        {label}
                    </p>
                    <p
                        className="text-sm"
                    >
                        {description}
                    </p>
                </div>
                <div
                    className="space-y-2"
                >
                    <Switch
                        disabled={isPending}
                        checked={value}
                        onCheckedChange={handleChange}
                    >
                        {value ? "On" : "Off"}
                    </Switch>
                </div>
            </div>
        </div>
    );
}

export const ToggleCardSkeleton = () => {
    return (
        <Skeleton
            className="rounded-xl w-full p-10"
        />
    )
}