'use client'
import React, { useState, useMemo, Suspense } from 'react'
import { Input } from "@/components/ui/input"
import { Dish } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"
import { DishItem } from './DistItem'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useQuery } from '@tanstack/react-query'
import { getAllDishes } from '@/app/actions/dish'
import { Skeleton } from "@/components/ui/skeleton"
import { SkeletonLoader } from './Loading'



export function DishList() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 3

    const { data: dishes, isLoading, isError, error } = useQuery({
        queryKey: ['dishes'],
        queryFn: async () => {
            const res = await getAllDishes();
            return res;
        }
    })

    const allTags = useMemo(() => {
        const tagSet = new Set<string>()
        dishes?.forEach(dish => dish.tags.forEach(tag => tagSet.add(tag)))
        return Array.from(tagSet)
    }, [dishes])

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        )
        setCurrentPage(1) // Reset to first page when changing filters
    }

    const filteredDishes = useMemo(() => {
        return dishes?.filter(dish => {
            const matchesSearch = dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                dish.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => dish.tags.includes(tag))
            return matchesSearch && matchesTags
        })
    }, [dishes, searchTerm, selectedTags])

    const pageCount = Math.ceil(filteredDishes?.length || 0 / itemsPerPage)
    const visibleDishes = filteredDishes?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )


    return (
        <section className="space-y-6 mx-auto ">
            {/* Filtering */}
            <div className="flex justify-center">
                <Input
                    placeholder="Search dishes..."
                    value={searchTerm}
                    onChange={(event) => {
                        setSearchTerm(event.target.value)
                        setCurrentPage(1) // Reset to first page when searching
                    }}
                    className="max-w-sm border-primary/[0.3] rounded-tr-none rounded-br-none"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="border-primary/[0.55] rounded-tl-none rounded-bl-none ">
                            Filter ({selectedTags.length}) <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        {allTags.map((tag) => (
                            <DropdownMenuCheckboxItem
                                key={tag}
                                className="capitalize"
                                checked={selectedTags.includes(tag)}
                                onCheckedChange={() => toggleTag(tag)}
                            >
                                {tag}
                            </DropdownMenuCheckboxItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Dishes */}
            <div className="xl:mx-60 lg:mx-32 sm:mx-20 transition-all space-y-5">
                {isLoading ? <SkeletonLoader /> : (
                    visibleDishes?.map((dish) => (
                        <DishItem key={dish.id} dish={dish} />
                    ))
                )}

            </div>

            {/* Footer */}
            <div className="flex items-center justify-between xl:mx-60 lg:mx-32 sm:mx-20 transition-all">
                <p className="text-sm text-gray-600">
                    Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredDishes?.length || 0)} to {Math.min(currentPage * itemsPerPage, filteredDishes?.length || 0)} of {filteredDishes?.length || 0} dishes
                </p>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(pageCount, prev + 1))}
                        disabled={currentPage === pageCount}
                    >
                        Next
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </section>
    )
}