import { $api } from "@/lib/api";
import { Link } from "react-router";

export function Product({ item }: { item: Schema["OrderItemEntity_List"] }) {
	const { data: product } = $api.useQuery(
		"get",
		"/catalog/product/{productId}",
		{
			params: {
				path: {
					productId: item.productId as string,
				},
			},
		},
	);

	return (
		<div className="flex">
			<Link to={`/products/${product?.productId}`}>
				<div className="bg-muted flex h-24 w-24 items-center justify-center rounded-md">
					<img
						src={product?.images?.find((img) => img.principal)?.url}
						alt={product?.name}
						width={0}
						height={0}
						className="size-16 object-contain"
					/>
				</div>
			</Link>

			<div className="relative flex w-full flex-col justify-between px-4">
				<h4 className="bg-muted hidden w-max rounded-lg px-4 py-0.5 text-xs sm:block">
					Vendido e entrege por TechCommerce
				</h4>

				<h3>{product?.name}</h3>

				<h2 className="text-xl font-bold">
					R$ {item?.unitPrice?.toFixed(2)}
				</h2>

				<span className="text-muted-foreground right-2 bottom-2 text-xs sm:absolute">
					Quantidade: {item.quantity}
				</span>
			</div>
		</div>
	);
}
