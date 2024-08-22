"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./DataTableColumnHeader"
import ActionCell from "./ActionCell"
import { Dish } from "@/lib/types"

export const columns: ColumnDef<Dish>[] = [
    // increment to show the index
    {
        accessorKey: "index",
        header: "",
        cell: ({ row }) => <div className="w-full">{row.index + 1}</div>,
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
            <div className="capitalize font-medium">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "tags",
        header: () => (<div className="text-center">Tag</div>),
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
        cell: ({ row }) => <ActionCell dish={row.original} />,
    },
]
