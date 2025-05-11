import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";

export default function Loading() {
	return (
		<>
			<Skeleton className="hidden h-[300px] rounded-none sm:block lg:h-[500px]" />

			<div className="mx-auto w-full max-w-screen-xl px-5 py-6">
				<Skeleton className="block h-40 w-full sm:hidden" />
				<section className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-x-4 gap-y-2 pt-8 sm:pt-0">
					{Array.from({ length: 6 }).map((_, i) => (
						<Skeleton key={i} className="h-10 w-full" />
					))}
				</section>

				<section className="pt-8">
					<Skeleton className="h-6 w-36" />
					<div className="flex gap-6 overflow-hidden pt-4">
						{Array.from({ length: 7 }).map((_, i) => (
							<div
								key={i}
								className="flex min-h-60 min-w-40 flex-col lg:min-h-64 lg:min-w-44"
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
						))}
					</div>
				</section>

				<div className="w-full gap-4 pt-8 sm:flex">
					<Skeleton className="h-40 w-full sm:h-52" />
					<Skeleton className="hidden h-40 w-full sm:block sm:h-52" />
				</div>

				<section className="pt-8">
					<Skeleton className="h-6 w-36" />
					<div className="flex gap-6 overflow-hidden pt-4">
						{Array.from({ length: 7 }).map((_, i) => (
							<div
								key={i}
								className="flex min-h-60 min-w-40 flex-col lg:min-h-64 lg:min-w-44"
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
						))}
					</div>
				</section>

				<section className="pt-8">
					<Skeleton className="h-6 w-36" />
					<div className="flex gap-6 overflow-hidden pt-4">
						{Array.from({ length: 7 }).map((_, i) => (
							<div
								key={i}
								className="flex min-h-60 min-w-40 flex-col lg:min-h-64 lg:min-w-44"
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
						))}
					</div>
				</section>
			</div>
		</>
	);
}
