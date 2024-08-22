'use client'
import { X } from "lucide-react";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { useState } from "react";

const TagInput: React.FC<{
    tags: string[];
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
}> = ({ tags, setTags }) => {
    const [inputValue, setInputValue] = useState('');

    const addTag = (tag: string) => {
        tag = tag.trim();
        if (tag && !tags.includes(tag)) {
            setTags([...tags, tag]);
            setInputValue('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTag(inputValue);
        }
    };

    const handleBlur = () => {
        if (inputValue) {
            addTag(inputValue);
        }
    };

    return (
        <div className="flex flex-wrap gap-3 rounded-md">
            {tags.map(tag => (
                <Badge key={tag} variant="secondary" className="h-7 px-3">
                    {tag}
                    <X size={17} className="text-slate-600 ml-1" onClick={() => removeTag(tag)} />
                </Badge>
            ))}
            <Input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                className="flex-grow border-primary/[0.6]"
                placeholder="Add tags..."
            />
        </div>
    );
};


export default TagInput;