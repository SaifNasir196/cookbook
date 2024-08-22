import { Suspense } from "react";
import { DishList } from "./DistList";
import { SkeletonLoader } from "./Loading";

export default async function Home() {

  return (
    <main className="flex flex-col px-4 py-3 shadow-sm md:px-6 lg:px-8 mb-40 h-full">
      <div className="container">
        <DishList />
      </div>

    </main>
  );
}
