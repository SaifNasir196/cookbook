'use client'
import React, { useState } from 'react'
import DishItem from './DistItem'
import { Input } from "@/components/ui/input"
import { Dish } from "@/lib/types"

interface DishListProps {
    dishes: Dish[]
}

export function DishList({ dishes }: DishListProps) {
    const [searchTerm, setSearchTerm] = useState("")

    const filteredDishes = dishes.filter(dish =>
        dish.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="space-y-4">
            <Input
                placeholder="Search dishes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm border-primary/[0.55]"
            />
            <div>
                {
                    filteredDishes.map((dish, index) => <DishItem dish={dish} index={index} />)
                }
            </div>
        </div>
    )
}