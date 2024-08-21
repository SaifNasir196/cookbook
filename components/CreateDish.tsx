'use client'
import React, { useState } from 'react';
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

const CreateDish: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [recipe, setRecipe] = useState('');
    const [tags, setTags] = useState<string[]>([]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // TODO: Implement dish creation logic
        console.log('Dish created', { name, recipe, tags });
        setOpen(false);
        // Reset form
        setName('');
        setRecipe('');
        setTags([]);
    };

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button
                        className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg dark:text-green-950 md:mx-20 lg:mx-40"
                        size="icon"
                    >
                        <Plus className="h-6 w-6" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create New Dish</DialogTitle>
                        <DialogDescription>
                            Add a new dish to your collection. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-4 my-5 ">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="name">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="border-primary/[0.6]"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="recipe" >
                                    Recipe
                                </Label>
                                <Textarea
                                    id="recipe"
                                    value={recipe}
                                    onChange={(e) => setRecipe(e.target.value)}
                                    className="border-primary/[0.6]"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="tags">
                                    Tags
                                </Label>
                                <TagInput tags={tags} setTags={setTags} />
                            </div>
                        </div>

                        <DialogFooter>
                            <Button type="submit" className='w-full'>Save dish</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CreateDish;

