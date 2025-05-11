import { Product } from "@/components/custom/product";
import {
	Carousel as C,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";

export function Carousel({
	data,
}: Readonly<{
	data: Schema["models.Product"][];
}>) {
	return (
		<C
			className="pt-4"
			opts={{
				dragFree: true,
				loop: true,
			}}
			plugins={[
				AutoScroll({
					active: true,
				}),
			]}
		>
			<CarouselContent>
				{data?.map((product) => (
					<CarouselItem
						key={product.productId}
						className="basis-auto"
					>
						<Product product={product} />
					</CarouselItem>
				))}
			</CarouselContent>
		</C>
	);
}
