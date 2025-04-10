import { Skeleton } from "@/components/ui/skeleton";

export function Loading() {
	return (
		<>
			<Skeleton className="mb-8 w-32 rounded-full py-4" />
			<div className="flex w-full flex-wrap gap-4 lg:gap-6">
				{Array.from({ length: 6 }).map(() => (
					<Skeleton
						key={Math.random()}
						className="flex h-48 w-40 cursor-pointer flex-col overflow-hidden rounded-md lg:h-64 lg:w-96"
					/>
				))}
			</div>
		</>
	);
}
