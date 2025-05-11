import { Footer } from "@/components/custom/footer";
import { Header } from "@/components/custom/header";
import { Button } from "@/components/ui/button";
import { $api } from "@/lib/api";
import { Link } from "react-router";
import { Carousel } from "./components/carousel";
import { Banner } from "./components/promo-banner";
import Loading from "./loading";

export default function Home() {
	const { data: categories, isLoading: isLoadingCategories } = $api.useQuery(
		"get",
		"/catalog/category",
	);
	const { data: products, isLoading: isLoadingProducts } = $api.useQuery(
		"get",
		"/catalog/product",
	);

	const mouseCategoryId = categories?.find(
		(category) => category.name === "Mouses",
	)?.categoryId as string;
	const headsetCategoryId = categories?.find(
		(category) => category.name === "Headsets",
	)?.categoryId as string;

	const { data: mouses, isLoading: isLoadingMouses } = $api.useQuery(
		"get",
		"/catalog/category/{categoryId}/products",
		{
			params: {
				path: {
					categoryId: mouseCategoryId,
				},
			},
		},
		{ enabled: !!mouseCategoryId },
	);

	const { data: headsets, isLoading: isLoadingHeadsets } = $api.useQuery(
		"get",
		"/catalog/category/{categoryId}/products",
		{
			params: {
				path: {
					categoryId: headsetCategoryId,
				},
			},
		},
		{ enabled: !!headsetCategoryId },
	);

	const dezMelhoresOfertas = products
		?.sort((a, b) => (a.price as number) - (b.price as number))
		.slice(0, 10);

	if (
		isLoadingCategories ||
		isLoadingProducts ||
		isLoadingMouses ||
		isLoadingHeadsets
	)
		return <Loading />;

	return (
		<>
			<Header />
			<main className="grow">
				<>
					<section className="bg-primary relative hidden h-[300px] w-full sm:block lg:h-[500px]">
						<img
							src="/notebook.jpg"
							alt=""
							className="bg-primary absolute h-full w-full object-cover"
						/>
						<div className="bg-primary absolute inset-0 opacity-60" />

						<div className="absolute top-1/2 left-1/2 z-40 mx-auto flex h-full w-full max-w-screen-xl -translate-x-1/2 -translate-y-1/2 items-center justify-between">
							<p className="text-center text-6xl leading-tight font-bold">
								<span className="block">Ofertas</span>
								<span className="border-primary block rounded-full border-2 px-4">
									Imperdíveis
								</span>
							</p>

							<p>
								<span className="block">
									<span className="text-4xl font-light">
										até{" "}
									</span>
									<span className="text-6xl font-bold">
										55%
									</span>
								</span>
								<span className="text-6xl leading-8 font-bold">
									Desconto
								</span>
								<span className="block text-4xl leading-5 font-light">
									só esse mês
								</span>
							</p>
						</div>
					</section>

					<div className="mx-auto w-full max-w-screen-xl px-5 py-6">
						<div className="from-primary to-primary/30 flex h-40 w-full items-center justify-between rounded-xl bg-gradient-to-r px-5 sm:hidden">
							<p className="grid">
								<span>
									<span>até </span>
									<span className="text-6xl font-bold">
										55%
									</span>
								</span>
								<span className="text-4xl leading-6 font-bold">
									Desconto
								</span>
								<span>só esse mês</span>
							</p>

							<p>a</p>
						</div>

						<section className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-x-4 gap-y-2 pt-8 sm:pt-0">
							{categories?.map((category) => (
								<Button
									key={category.categoryId}
									variant="outline"
									size="lg"
									asChild
								>
									<Link
										to={`/categories/${category.categoryId}`}
									>
										{category.name?.toUpperCase()}
									</Link>
								</Button>
							))}
						</section>

						<section className="pt-8">
							<p className="font-bold">MELHORES OFERTAS</p>
							<Carousel data={dezMelhoresOfertas!} />
						</section>

						<div className="w-full gap-4 sm:flex">
							<Banner
								className="grow"
								category="headsets"
								image="/headset.png"
								discount={20}
								to={`/categories/${headsetCategoryId}`}
								invert
							/>

							<Banner
								className="hidden grow md:block"
								category="mouses"
								image="/mouse.png"
								discount={55}
								to={`/categories/${mouseCategoryId}`}
							/>
						</div>

						<section className="pt-8">
							<p className="font-bold">MOUSES</p>
							<Carousel data={mouses!} />
						</section>

						<Banner
							className="block md:hidden"
							category="mouses"
							image="/mouse.png"
							discount={55}
							to={`/categories/${mouseCategoryId}`}
						/>

						<section className="pt-8">
							<p className="font-bold">HEADSETS</p>
							<Carousel data={headsets!} />
						</section>
					</div>
				</>
			</main>
			<Footer />
		</>
	);
}
