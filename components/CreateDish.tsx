'use client'
import React, { useState, useRef } from 'react';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import TagInput from "@/components/TagInput";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createDish } from '@/app/actions/dish';

const CreateDish = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [tags, setTags] = useState<string[]>([]);
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();

    const { mutate: handleCreate, isPending, isError, error } = useMutation({
        mutationFn: async () => {
            if (!nameRef.current) throw new Error('Add name of dish to add');
            if (!tags.length) throw new Error('Add tags to dish to add');
            await createDish({
                name: nameRef.current.value,
                recipe: textareaRef.current?.value || '',
                tags: tags
            });
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['dishes'] });
            setOpen(false);
            setTags([]);
        }
    })


    return (
        <div className='flex justify-center items-center'>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button
                        className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg dark:text-green-950 md:mx-20 lg:mx-40"
                        size="icon"
                    >
                        <Plus className="h-6 w-6" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="w-[20rem] rounded-lg sm:w-full transition-all">
                    <DialogHeader>
                        <DialogTitle>Create New Dish</DialogTitle>
                        <DialogDescription>
                            Add a new dish to your collection. Click save when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 my-5 ">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="name"> Name </Label>
                            <Input id="name" ref={nameRef} placeholder="Nihari" className="border-primary/[0.6]" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="recipe" > Recipe </Label>
                            <Textarea id="recipe" ref={textareaRef} placeholder='Heat oil, fry onions until golden brown.
                                Add meat (beef or lamb), ginger-garlic paste, and spices (nihari masala, red chili, turmeric).
                                Cook until meat is browned.
                                Add water, bring to a boil, then simmer for 4-6 hours until meat is tender.
                                Mix wheat flour with water, add to the curry to thicken.
                                Simmer for 15-20 minutes more.
                                Garnish with ginger, cilantro, and lemon juice.
                                Serve hot with naan or rice.' className="border-primary/[0.6] h-64" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="tags"> Tags </Label>
                            <TagInput tags={tags} setTags={setTags} />
                        </div>

                    </div>

                    <DialogFooter>
                        <Button onClick={() => handleCreate()} disabled={isPending} className='w-full'>
                            {isPending ? 'Saving...' : 'Save Dish'}
                        </Button>
                    </DialogFooter>
                </DialogContent >
            </Dialog >
        </div>
    );
};

export default CreateDish;

