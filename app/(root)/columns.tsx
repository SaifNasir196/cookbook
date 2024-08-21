"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import useCopyToClipboard from "@/app/hooks/useCopyToClipboard"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "./DataTableColumnHeader"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dish } from "@/lib/types"

export const columns: ColumnDef<Dish>[] = [
    // increment to show the index
    {
        accessorKey: "index",
        header: "",
        cell: ({ row }) => <div className="w-10">{row.index + 1}</div>,
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Email" />

            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },

    {
        accessorKey: "tags",
        header: () => {
            return (
                <div className="text-center">Tag</div>

            )
        },
        cell: ({ row }) => (
            <div className="flex space-x-2 justify-end">
                {(row.getValue("tags") as string[]).map((tag: string) => (
                    <span
                        key={tag}
                        className="px-4 py-1 text-sm font-semibold tracking-wide text-white bg-primary/[0.8] dark:bg-primary dark:text-green-950 rounded-xl"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        ),
    },



    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const dish = row.original
            const { isCopied, copyToClipboard } = useCopyToClipboard(process.env.NEXT_PUBLIC_FRONTEND_URL + `/dish/${dish.id}`);

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onSelect={e => e.preventDefault()} onClick={copyToClipboard}>
                            {isCopied ? "Copied!" : "Copy link"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
