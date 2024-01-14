"use client"

import { useTransition } from "react"

import { onFollow, onUnfollow } from "@/actions/follow"
import { Button } from "@/components/ui/button"
import { toast } from "sonner";
import { onBlock, onUnblock } from "@/actions/block";

interface ActionsProps {
    isFollowing: boolean;
    userId: string;
}

export const Actions = ({
    isFollowing,
    userId,
}: ActionsProps) => {
    const [isPending, startTransition] = useTransition();

    const handleOnFollow = () => {
        startTransition(() => {
            onFollow(userId)
                .then((data) => {
                    toast.info(`You are now following ${data.following.username}!`);

                })
                .catch(() => {
                    toast.error("Something went wrong!");
                });
        });
    }

    const handleOnUnfollow = () => {
        startTransition(() => {
            onUnfollow(userId)
                .then((data) => {
                    toast.info(`You are no longer following ${data.following.username}!`);
                })
                .catch(() => {
                    toast.error("Something went wrong!");
                });
        });
    }

    const handleOnBlock = () => {
        startTransition(() => {
            onBlock(userId)
                .then((data) => {
                    toast.info(`You have blocked ${data.blocked.username}!`);
                })
                .catch(() => {
                    toast.error("Something went wrong!");
                });
        });
    }
    const handleOnUnblock = () => {
        startTransition(() => {
            onUnblock(userId)
                .then((data) => {
                    toast.info(`You have unblocked ${data.blocked.username}!`);
                })
                .catch(() => {
                    toast.error("Something went wrong!");
                });
        });
    }

    return (
        <>
            <Button
                onClick={() => {
                    if (isFollowing) {
                        handleOnUnfollow();
                    } else {
                        handleOnFollow();
                    }
                }}
                disabled={isPending}
                variant={"primary"}
            >
                {isFollowing ? "Unfollow" : "Follow"}
            </Button>
            <Button
                onClick={() => {
                    handleOnBlock();
                }}
                disabled={isPending}
                variant={"destructive"}
            >
                Block
            </Button>
            <Button
                onClick={() => {
                    handleOnUnblock();
                }}
                disabled={isPending}
                variant={"destructive"}
            >
                Unblock
            </Button>
        </>
    )
}