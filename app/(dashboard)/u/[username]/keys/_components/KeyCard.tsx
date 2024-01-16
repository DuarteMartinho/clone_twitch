"use client"

import { Input } from "@/components/ui/input";
import CopyButton from "./CopyButton";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface KeyCardProps {
    title: string;
    description: string;
    value: string | null;
}

export const KeyCard = ({
    title,
    description,
    value,
}: KeyCardProps) => {
    const [show, setShow] = useState(false);

    return (
        <div
            className="rounded-xl bg-muted p-6"
        >
            <div
                className="flex items-start gap-x-10"
            >
                <p
                    className="font-semibold shrink-0"
                >
                    {title}
                </p>
                <div
                    className="space-y-2 w-full"
                >
                    <div
                        className="w-full flex items-center gap-x-2"
                    >
                        <Input
                            disabled
                            type={show ? "text" : "password"}
                            value={value || ""}
                            placeholder="Stream Key"
                        />
                        <CopyButton
                            value={value || ""}
                        />
                    </div>
                    <Button
                        onClick={() => setShow(!show)}
                        variant={"link"}
                        size={"sm"}
                    >
                        {show ? "Hide" : "Show"}
                    </Button>
                </div>
            </div>
        </div>
    )
}