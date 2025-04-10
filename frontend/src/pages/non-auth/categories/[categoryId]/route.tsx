import { Footer } from "@/components/custom/footer";
import { Header } from "@/components/custom/header";
import { Product } from "@/components/custom/product";
import { $api } from "@/lib/api";
import { useParams } from "react-router";
import { Loading } from "./loading";

export default function Category() {
	const { categoryId } = useParams();

	if (!categoryId) return;

	const { data: category, isPending: isPendingCategory } = $api.useQuery(
		"get",
		"/catalog/category/{categoryId}",
		{
			params: {
				path: {
					categoryId,
				},
			},
		},
	);

	const { data: categories, isPending: isPendingCategories } = $api.useQuery(
		"get",
		"/catalog/category/{categoryId}/products",
		{
			params: {
				path: {
					categoryId,
				},
			},
		},
	);

	return (
		<>
			<Header />
			<main className="mx-auto w-full max-w-screen-xl grow px-5 py-6">
				{isPendingCategory || isPendingCategories ? (
					<Loading />
				) : (
					<>
						<section className="pb-8">
							<div className="border-primary flex w-min items-center space-x-1 rounded-full border-2 px-4 py-1">
								<span className="text-sm font-semibold">
									{category?.name?.toUpperCase()}
								</span>
							</div>
						</section>

						<section className="flex flex-wrap gap-6">
							{categories?.map((product) => (
								<Product
									key={product.productId}
									product={product}
								/>
							))}
						</section>
					</>
				)}
			</main>
			<Footer />
		</>
	);
}
