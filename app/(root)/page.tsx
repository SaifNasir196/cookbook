import { Dish } from "@/lib/types";
import { DishList } from "./DistList";

async function getData(): Promise<Dish[]> {
  // Fetch data from your API here.
  return [
    {
      id: 1,
      name: "Spaghetti",
      recipe: "Boil water, add spaghetti, add sauce",
      tags: ["pasta", "italian", "dinner"],
      user: "John Doe",
    },
    {
      id: 2,
      name: "Tacos",
      recipe: "Cook meat, add toppings",
      tags: ["mexican", "dinner"],
      user: "Jane Doe",
    },
    {
      id: 3,
      name: "Pizza",
      recipe: "Make dough, add sauce, bake",
      tags: ["italian", "dinner"],
      user: "John Doe",
    },
    {
      id: 4,
      name: "Spaghetti",
      recipe: "Boil water, add spaghetti, add sauce",
      tags: ["pasta", "italian", "dinner"],
      user: "John Doe",
    },
    {
      id: 5,
      name: "Tacos",
      recipe: "Cook meat, add toppings",
      tags: ["mexican", "dinner"],
      user: "Jane Doe",
    },
    {
      id: 6,
      name: "Pizza",
      recipe: "Make dough, add sauce, bake",
      tags: ["italian", "dinner"],
      user: "John Doe",
    },
    {
      id: 7,
      name: "Spaghetti",
      recipe: "Boil water, add spaghetti, add sauce",
      tags: ["pasta", "italian", "dinner"],
      user: "John Doe",
    },
  ]
}


export default async function Home() {
  const data = await getData()

  return (
    <main className="flex flex-col px-4 py-3 shadow-sm md:px-6 lg:px-8 mb-40 h-full">
      {/* search dishes */}
      <div className="container mt-20">
        {/* <Input ref={searchRef} placeholder="Search dishes" className="py-4 border-primary/[0.6]" /> */}
      </div>

      {/* featured dishes */}
      <div className="container">
        {/* <DataTable columns={columns} data={data} /> */}

        <DishList dishes={data} />
      </div>

    </main>
  );
}
