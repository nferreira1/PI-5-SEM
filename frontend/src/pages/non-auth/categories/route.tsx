import { Footer } from "@/components/custom/footer";
import { Header } from "@/components/custom/header";
import { $api } from "@/lib/api";
import { LayoutGrid } from "lucide-react";
import { Link } from "react-router";
import { Loading } from "./loading";

export default function Categories() {
	const { data, isPending } = $api.useQuery("get", "/catalog/category");

	return (
		<>
			<Header />
			<main className="mx-auto w-full max-w-screen-xl grow px-5 py-6">
				{isPending ? (
					<Loading />
				) : (
					<>
						<section className="pb-8">
							<div className="border-primary flex w-min items-center space-x-1 rounded-full border-2 px-4 py-1">
								<LayoutGrid
									size={20}
									fill="white"
									strokeWidth={2}
								/>
								<span className="text-sm font-semibold">
									CATEGORIAS
								</span>
							</div>
						</section>

						<section className="flex w-full flex-wrap gap-4 lg:gap-6">
							{data?.map((category) => (
								<>
									<Link
										key={category.categoryId}
										to={`/categories/${category.categoryId}`}
									>
										<div className="flex h-48 w-40 cursor-pointer flex-col overflow-hidden rounded-md lg:h-64 lg:w-96">
											<div className="from-primary to-primary/30 flex grow items-center justify-center bg-gradient-to-r">
												<img
													alt={category.name}
													src={category.url}
													width={160}
													height={160}
													className="size-32 object-contain lg:size-40"
												/>
											</div>

											<div className="bg-muted grid h-10 w-full place-items-center lg:min-h-14">
												<span className="truncate text-xs font-semibold lg:text-base">
													{category.name?.toUpperCase()}
												</span>
											</div>
										</div>
									</Link>
								</>
							))}
						</section>
					</>
				)}
			</main>
			<Footer />
		</>
	);
}
