import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";

export function Loading() {
	return (
		<>
			<Skeleton className="relative flex h-[570px] items-center rounded-none md:col-span-1 md:rounded-lg lg:col-span-2" />
			<Skeleton className="hidden h-[570px] md:col-span-1 md:block md:rounded-lg lg:col-span-1" />

			<section className="text-primary/10 col-span-full animate-pulse px-5 py-6 pt-8 md:hidden md:pb-0 md:pl-0">
				<div className="grid gap-2">
					<Skeleton className="h-3 w-28" />
					<Skeleton className="h-[18px] w-48" />
					<Skeleton className="h-3 w-36" />

					<div className="flex items-baseline">
						{Array.from({ length: 5 }).map((_, index) => (
							<Star
								key={index}
								size={16}
								className="fill-primary/10 text-primary/10 rounded-md"
							/>
						))}
						<Skeleton className="ml-3 h-3 w-28" />
					</div>

					<div>
						<h6 className="text-2xl font-bold">R$ 349,00</h6>
						<span className="text-sm">
							De:
							<span className="line-through"> R$ 349,00</span>
						</span>
					</div>

					<div className="flex items-center gap-4">
						<Button size="icon" className="bg-primary/10" />

						<span className="text-sm font-bold">1</span>

						<Button size="icon" className="bg-primary/10" />
					</div>

					<div className="py-6">
						<h6 className="pb-2 font-semibold">Descrição</h6>
						<p className="text-sm">
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Mollitia aspernatur esse architecto corporis
							in tempora odio explicabo sed labore asperiores
							velit quas commodi voluptatum, nam natus quasi?
							Incidunt, quaerat inventore!
						</p>
					</div>

					<Skeleton className="bg-primary/10 text-primary/10 h-10" />

					<Skeleton className="h-14" />
				</div>
			</section>

			<section className="text-primary/10 col-span-full pb-6 pl-5 md:pl-0">
				<h4 className="text-lg font-bold">PRODUTOS RECOMENDADOS</h4>

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
		</>
	);
}
