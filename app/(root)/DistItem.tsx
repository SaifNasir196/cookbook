'use client'
import React from 'react'
import { Dish } from "@/lib/types"
import ActionCell from "./ActionCell"
import { format } from 'date-fns'
import { useWindowSize } from 'usehooks-ts'

interface DishItemProps {
    dish: Dish
}

export function DishItem({ dish }: DishItemProps) {
    const { width } = useWindowSize()
    const isSmallScreen = width < 600 // 640px is sm breakpoint in tailwind
    return (
        <div className="bg-primary/5 rounded-lg p-4 shadow-lg hover:shadow-sm">
            <div className="flex justify-between items-start gap-8">
                <div className='w-full'>
                    <div className="flex justify-between items-end">
                        <h3 className="text-lg font-semibold capitalize">{dish.name}</h3>
                        <p className="text-sm text-gray-500">
                            {dish.createdAt && !isSmallScreen
                                ? format(new Date(dish.createdAt), 'PPp')
                                : format(new Date(dish.createdAt), 'PP')
                            }
                        </p>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {dish.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 text-xs font-semibold tracking-wide text-white bg-primary/[0.8] dark:bg-primary dark:text-green-950 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
                <ActionCell dish={dish} />
            </div>
        </div>
    )
}