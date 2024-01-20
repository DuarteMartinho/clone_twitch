import { onUnblock } from "@/actions/block"
import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { toast } from "sonner"

export const UnblockButton = ({
    userId,
}: {
    userId: string
}) => {
    const [isPending, startTransition] = useTransition()

    const onClick = async () => {
        startTransition(() => {
            onUnblock(userId)
                .then((result) => {
                    toast.success(`Unbanned ${result.blocked.username}`)
                })
                .catch(() => {
                    toast.error(`Something went wrong.`)
                });
        })
    }

    return (
        <Button
            onClick={onClick}
            disabled={isPending}
            variant="link"
            size="sm"
            className="text-blue-500 w-full"
        >
            Unban
        </Button>
    )
}