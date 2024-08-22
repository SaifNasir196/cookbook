"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import useCopyToClipboard from "@/app/hooks/useCopyToClipboard"
import { Button } from "@/components/ui/button"
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


const ActionCell: React.FC<{ dish: Dish }> = ({ dish }) => {
    const url = process.env.NEXT_PUBLIC_FRONTEND_URL + `/dish/${dish.id}`;
    const { isCopied, copyToClipboard } = useCopyToClipboard(url);

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
    );
};

export default ActionCell;