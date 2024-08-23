"use client";
import React from 'react'
import { DishList } from '@/app/(root)/DistList'
import { useQuery } from '@tanstack/react-query'
import { getAllDishes } from '@/app/actions/dish'


const page = () => {
    const query = useQuery({
        queryKey: ['dishes'],
        queryFn: async () => {
            const res = await getAllDishes();
            return res;
        }
    })
    return (

        <section className='container mt-16'>
            <h1 className='text-3xl font-bold text-center'>Favourites</h1>
            <div className="my-16">
                <DishList query={query} />

            </div>
        </section>
    )
}

export default page