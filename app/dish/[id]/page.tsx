'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { getDish } from '@/app/actions/dish'
import { format } from 'date-fns'
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Dish } from '@/lib/types'
import { Separator } from "@/components/ui/separator"


export default function DishPage() {
    const { id }: { id: string } = useParams()

    const { data: dish, isLoading, error } = useQuery({
        queryKey: ['dish', id],
        queryFn: async () => await getDish(id)
    })

    if (isLoading) {
        return (
            <div className="container mx-auto p-4 space-y-4">
                <Skeleton className="h-8 w-[200px]" />
                <Skeleton className="h-4 w-[300px]" />
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-20 w-full" />
            </div>
        )
    }

    if (error) {
        return <div className="container mx-auto p-4 text-red-500">Error loading dish</div>
    }

    if (!dish) {
        return <div className="container mx-auto p-4">Dish not found</div>
    }

    return (
        <section className="space-y-6 mt-12">
            <Link href="/" className="text-primary-80 hover:underline inline-block mb-4">
                ← All Dishes
            </Link>
            <div className="flex justify-between items-end">

                <h1 className="text-3xl font-bold capitalize">{dish.name}</h1>
                <p className='text-primary/60'>
                    {dish.user
                        ? dish.user
                        : null
                    }
                </p>

                {/* <p className="text-sm text-gray-500">
                    {dish.createdAt
                        ? "Created at:" + format(new Date(dish.createdAt), 'PPp')
                        : null
                    }
                </p> */}
            </div>

            <div className="flex flex-wrap gap-2">
                {dish.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className='text-sm h-8 '>
                        {tag}
                    </Badge>
                ))}
            </div>

            {dish.recipe &&
                <div>
                    <h2 className="text-xl font-semibold mb-2">Recipe:</h2>
                    <p className="whitespace-pre-wrap bg-primary/5 shadow-sm p-4 rounded-lg">{dish.recipe}</p>
                </div>
            }

            <Separator className='bg-primary/10' />

            <div className=''>
                <h2 className="text-xl font-semibold mb-2">Ingredients:</h2>
                <ul className='list-disc list-inside whitespace-pre-wrap bg-primary/5 shadow-sm p-4 rounded-lg'>
                    {["salt", "pepper", "turmeric", "red chili"].map((ingredient) => (
                        <li key={ingredient}>{ingredient}</li>
                    ))}
                </ul>

            </div>

            <Separator className='bg-primary/10' />

            <div className="">
                <h2 className="text-xl font-semibold mb-2">Similar dishes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {["dish1", "dish2", "dish3", "dish4"].map((dish) => (
                        <div key={dish} className="bg-primary/5 p-4 rounded-lg shadow-sm">
                            <div className="flex justify-between pr-5">
                                <h3 className="text-lg font-semibold mb-2">{dish}</h3>
                                <p className="text-primary/60">by user</p>
                            </div>
                            {/* tags */}
                            <div className="flex flex-wrap gap-2">
                                {["tag1", "tag2", "tag3"].map((tag) => (
                                    <Badge key={tag} variant="secondary" className='text-sm h-8 '>
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>



        </section>
    )
}