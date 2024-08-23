'use client'
import { DishList } from "./DistList";
import { useQuery } from '@tanstack/react-query'
import { getAllDishes } from '@/app/actions/dish'

export default function Home() {

  const query = useQuery({
    queryKey: ['dishes'],
    queryFn: async () => {
      const res = await getAllDishes();
      return res;
    }
  })

  return (
    <main className="flex flex-col px-4 py-3 md:px-6 lg:px-8 mb-40 h-full">
      <div className="my-[9.5rem]">
        <DishList query={query} />
      </div>

    </main>
  );
}
