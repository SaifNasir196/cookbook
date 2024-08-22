"use client"

import * as React from "react"
import { Dish } from "@/lib/types"
import ActionCell from "./ActionCell"

const DishItem = ({ dish, index }: { dish: Dish, index: number }) => {
    return (
        <div key={dish.id} className="bg-primary/5 rounded-lg p-4 shadow-md mb-4">
            <div className="flex justify-between items-start">
                <div className="flex-grow">
                    <div className="flex items-center mb-2">
                        <span className="text-sm text-gray-500 mr-2">{index + 1}.</span>
                        <h3 className="text-lg font-semibold capitalize">{dish.name}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {dish.tags.map((tag: string) => (
                            <span key={tag}
                                className="px-3 py-1 text-xs font-semibold tracking-wide text-white bg-primary/[0.8]  rounded-full"> {/* dark:bg-primary dark:text-green-950 */}
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="ml-4">
                    <ActionCell dish={dish} />
                </div>
            </div>
        </div>
    )
}

export default DishItem;