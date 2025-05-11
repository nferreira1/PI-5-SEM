import { MoveDown, Star } from "lucide-react";
import { Link } from "react-router";

export function Product({ product }: { product: Schema["models.Product"] }) {
	return (
		<Link
			key={product.productId}
			to={`/products/${product.productId}`}
			className="inline-block"
		>
			<div className="flex h-60 w-40 flex-col lg:h-64 lg:w-44">
				<div className="bg-muted relative flex aspect-square grow items-center justify-center rounded-md">
					<div className="bg-primary absolute top-1.5 left-1.5 flex items-center gap-1 rounded-2xl px-2 py-1.5">
						<MoveDown size={14} strokeWidth={3} />
						<span className="text-xs font-semibold">55%</span>
					</div>
					<img
						alt={product.name}
						src={
							product.images?.find((imagem) => imagem.principal)
								?.url
						}
						width={96}
						height={96}
						className="object-contain"
					/>
				</div>
				<div className="flex flex-col space-y-0.5 pt-2">
					<span className="truncate text-xs lg:text-sm">
						{product.name}
					</span>
					<div className="flex items-baseline gap-1">
						<span className="font-semibold lg:text-lg">
							R$ {product.price}
						</span>
						<span className="text-muted-foreground text-xs line-through lg:text-sm">
							R$ {product.price}
						</span>
					</div>
					<div className="flex items-center gap-0.5">
						{Array.from({ length: 5 }).map((_, index) => (
							<Star
								key={index}
								size={15}
								className="fill-primary text-primary data-[last=true]:fill-transparent"
							/>
						))}
						<span className="text-muted-foreground ml-1 text-xs lg:text-sm">
							(25)
						</span>
					</div>
				</div>
			</div>
		</Link>
	);
}
