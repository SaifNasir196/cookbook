import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonLoader() {
    return (
        <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
                <Skeleton className="h-24 w-full rounded-md" />
            ))}
        </div>
    )
}