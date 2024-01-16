import { Input } from "@/components/ui/input";
import CopyButton from "./CopyButton";

interface URLCardProps {
    title: string;
    description: string;
    value: string | null;
}

export const URLCard = ({
    title,
    description,
    value,
}: URLCardProps) => {
    return (
        <div
            className="rounded-xl bg-muted p-6"
        >
            <div
                className="flex items-center gap-x-10"
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
                            value={value || ""}
                            placeholder="Server URL"
                        />
                        <CopyButton
                            value={value || ""}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}