import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";

export function Loading() {
	return (
		<>
			<Skeleton className="mb-8 w-24 rounded-full py-4" />
			<section className="flex flex-wrap gap-6">
				{Array.from({ length: 2 }).map(() =>
					Array.from({ length: 6 }).map(() => (
						<div
							key={Math.random()}
							className="flex h-52 w-40 flex-col lg:h-60 lg:w-44"
						>
							<Skeleton className="relative flex grow items-center justify-center rounded-md" />
							<div className="flex h-2/6 flex-col space-y-1.5 pt-2">
								<Skeleton className="h-4 w-10/12 lg:h-[14px]" />
								<div className="flex items-baseline gap-1">
									<Skeleton className="h-[18px] w-3/6" />
									<Skeleton className="h-3 w-1/6 lg:h-[14px]" />
								</div>
								<div className="flex items-center gap-0.5">
									{Array.from({ length: 5 }).map(
										(_, index) => (
											<Star
												key={index}
												size={16}
												className="fill-primary/10 text-primary/10 animate-pulse rounded-md"
											/>
										),
									)}
									<Skeleton className="h-3 w-5 lg:h-[14px]" />
								</div>
							</div>
						</div>
					)),
				)}
			</section>
		</>
	);
}
