import { Footer } from "@/components/custom/footer";
import { Header } from "@/components/custom/header";
import { Product as P } from "@/components/custom/product";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import { $api } from "@/lib/api";
import { useParams } from "react-router";
import { ProductDetails } from "./components/product-details";
import { ProductImages } from "./components/product-images";
import { Loading } from "./loading";

export default function Product() {
	const { productId } = useParams();

	if (!productId) return;

	const { data: product, isPending: isPendingProduct } = $api.useQuery(
		"get",
		"/catalog/product/{productId}",
		{
			params: {
				path: {
					productId,
				},
			},
		},
	);

	const { data: products, isPending: isPendingProducts } = $api.useQuery(
		"get",
		"/catalog/product",
	);

	return (
		<>
			<Header />

			<main className="flex w-full max-w-screen-xl grow auto-rows-min flex-col md:mx-auto md:grid md:grid-cols-2 md:gap-8 md:px-5 md:py-8 lg:grid-cols-3">
				{isPendingProduct || isPendingProducts ? (
					<Loading />
				) : (
					<>
						<section className="bg-muted relative flex aspect-square h-[570px] items-center md:col-span-1 md:aspect-auto md:rounded-lg lg:col-span-2">
							<ProductImages product={product} />
						</section>

						<ProductDetails product={product} />

						<section className="col-span-2 overflow-x-hidden px-5 pb-8 md:px-0 md:pb-0 lg:col-span-3">
							<h4 className="text-lg font-bold">
								PRODUTOS RECOMENDADOS
							</h4>
							<Carousel
								className="pt-4"
								opts={{
									dragFree: true,
								}}
							>
								<CarouselContent>
									{products
										?.sort(() => Math.random() - 0.5)
										?.map((product) => (
											<CarouselItem
												key={product.productId}
												className="basis-auto"
											>
												<P product={product} />
											</CarouselItem>
										))}
								</CarouselContent>
							</Carousel>
						</section>
					</>
				)}
			</main>
			<Footer />
		</>
	);
}
