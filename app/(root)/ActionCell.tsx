"use client"

import React, { useState } from "react"
import { MoreHorizontal } from "lucide-react"
import useCopyToClipboard from "@/app/hooks/useCopyToClipboard"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dish } from "@/lib/types"
import Link from "next/link"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog"
import { useUser } from "@clerk/nextjs"
import { deleteDish } from "@/app/actions/dish"
import { useMutation, useQueryClient } from "@tanstack/react-query"


const ActionCell: React.FC<{ dish: Dish }> = ({ dish }) => {
    const url = process.env.NEXT_PUBLIC_FRONTEND_URL + `/dish/${dish.id}`;
    const { isCopied, copyToClipboard } = useCopyToClipboard(url);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const { user } = useUser();
    const queryClient = useQueryClient();

    const { mutate: handleDeleteDish, isPending, isError, error } = useMutation({
        mutationFn: async () => {
            await deleteDish(dish.id)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dishes'] })
            setOpenDeleteDialog(false);
        }
    });

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-background brightness-110">
                    {/* view */}
                    <Link href={`/dish/${dish.id}`}>
                        <DropdownMenuItem>View</DropdownMenuItem>
                    </Link>

                    <DropdownMenuSeparator />

                    {/* copy link */}
                    <DropdownMenuItem onSelect={e => e.preventDefault()} onClick={copyToClipboard}>
                        {isCopied ? "Copied!" : "Copy link"}
                    </DropdownMenuItem>

                    {/* delete */}
                    {user?.id === dish.user && (
                        <DropdownMenuItem onClick={() => handleDeleteDish()}>Delete</DropdownMenuItem>
                    )}

                </DropdownMenuContent>
            </DropdownMenu>

            {/* Delete dialog */}
            <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. Are you sure you want to permanently
                            delete this dish?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button type="submit">Confirm</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ActionCell;