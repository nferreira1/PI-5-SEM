import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star, Truck } from "lucide-react";
import { useState } from "react";

export function ProductDetails({
	product,
}: {
	product: Schema["models.Product"] | undefined;
}) {
	const [amount, setAmount] = useState<number>(1);

	const handleAmount = (value: 1 | -1) => {
		if (value === -1 && amount <= 1) return;
		if (value === 1 && amount >= (product?.stock ?? 0)) return;
		setAmount((prev) => prev + value);
	};

	return (
		<section className="md:bg-muted grid h-[570px] grow gap-4 px-5 py-8 md:col-span-1 md:rounded-lg lg:col-span-1">
			<div>
				<span className="text-muted-foreground text-xs">
					Novo | 100 vendidos
				</span>
				<h4 className="text-lg font-semibold">{product?.name}</h4>
				<span className="text-primary text-xs">
					Disponível em estoque {product?.stock} unidades
				</span>
				<div className="flex items-center gap-1 pt-0.5">
					{Array.from({ length: 5 }).map((_, index) => (
						<Star
							key={index}
							size={15}
							className="fill-primary text-primary data-[last=true]:fill-transparent"
						/>
					))}
					<span className="text-muted-foreground ml-1 text-sm">
						(25 avaliações)
					</span>
				</div>
			</div>

			<div>
				<h6 className="text-2xl font-bold">{product?.price}</h6>
				<span className="text-muted-foreground text-sm">
					De:
					<span className="line-through"> {product?.price}</span>
				</span>
			</div>

			<div className="flex items-center gap-4">
				<Button
					size="icon"
					className="transition-transform hover:scale-110"
					disabled={amount === 1}
					onClick={() => handleAmount(-1)}
				>
					<ChevronLeft size={16} />
				</Button>

				<span className="text-sm">{amount}</span>

				<Button
					size="icon"
					className="transition-transform hover:scale-110"
					disabled={product?.stock === amount}
					onClick={() => handleAmount(1)}
				>
					<ChevronRight size={16} />
				</Button>
			</div>

			<div className="py-6">
				<h6 className="pb-2 font-semibold">Descrição</h6>
				<p className="text-muted-foreground text-sm">
					{product?.description}
				</p>
			</div>

			<Button size="lg">ADICIONAR AO CARRINHO</Button>

			<div className="bg-muted md:bg-accent flex items-center gap-x-6 rounded-xl px-6 py-4">
				<Truck size={30} />

				<div className="grid text-sm">
					<span className="truncate">
						Entrega via
						<span className="font-semibold italic"> Sedex</span>
					</span>
					<span className="text-primary truncate">
						Envio para todo o Brasil
					</span>
				</div>

				<span className="ml-auto truncate text-xs font-semibold">
					Frete grátis
				</span>
			</div>
		</section>
	);
}
