"use client"

import { Button } from "@/components/ui/button";
import { CheckCheck, Copy } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
    value: string;
}

const CopyButton = ({
    value,
}: CopyButtonProps) => {
    const [isCopied, setIsCopied] = useState(false);
    const Icon = isCopied ? CheckCheck : Copy;

    const handleClick = () => {
        if (!value) {
            return;
        }

        setIsCopied(true);
        navigator.clipboard.writeText(value);
        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    }

    return (
        <Button
            onClick={handleClick}
            disabled={!value || isCopied}
            variant={"ghost"}
            size={"sm"}
        >
            <Icon
                className="h-4 w-4"
            />
        </Button>
    );
}

export default CopyButton;