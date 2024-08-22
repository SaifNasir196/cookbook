import { Dish } from "@/lib/types"
import ActionCell from "./ActionCell"
import {
  ColumnDef,
} from "@tanstack/react-table"


const columns: ColumnDef<Dish>[] = [
  {
    id: 'dish',
    accessorFn: row => row, // Use the entire row data
    cell: ({ row }) => {
      const dish = row.original
      return (
        <div className="bg-background border border-primary/[0.55] rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold capitalize">{dish.name}</h3>
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
    },
  },
]


export default columns;