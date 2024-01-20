"use client"

import { UserAvatar } from "@/components/UserAvatar"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { UnblockButton } from "./UnblockButton"

export type BlockUser = {
    id: string
    userId: string
    username: string
    imageUrl: string
    createdAt: string
}

export const columns: ColumnDef<BlockUser>[] = [
    {
        accessorKey: "username",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Username
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div
                className="flex items-center gap-x-4"
            >
                <UserAvatar
                    imageUrl={row.original.imageUrl}
                    username={row.original.username}
                />
                <span
                    className="text-lg font-bold"
                >
                    {row.original.username}
                </span>
            </div>
        ),
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Blocked At
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <UnblockButton
                userId={row.original.userId}
            />
        ),
    },
]
