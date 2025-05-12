import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Product } from "./product";

export function AccordionProducts({
	order,
}: {
	order: Schema["OrderEntity_List"];
}) {
	const total = order.items?.reduce((acc, item) => {
		const itemTotal =
			(item.unitPrice as number) * (item.quantity as number);
		return acc + itemTotal;
	}, 0) as number;

	return (
		<Accordion
			type="multiple"
			className="grid w-full gap-4 rounded-xl border-2 px-4"
		>
			<AccordionItem value={(order.orderId as number).toString()}>
				<AccordionTrigger>
					<div>
						<h6 className="font-bold">NÚMERO DO PEDIDO</h6>
						<span className="text-muted-foreground font-normal">
							#{order.orderId}
						</span>
					</div>
				</AccordionTrigger>
				<AccordionContent className="grid gap-5">
					<div className="grid justify-between gap-4 sm:flex">
						<p className="grid">
							<span className="font-semibold">STATUS</span>
							<span className="text-primary font-semibold">
								{order.status?.name}
							</span>
						</p>
						<p className="grid">
							<span className="font-semibold">DATA</span>
							<span className="text-muted-foreground font-normal">
								{format(
									new Date(order.createdAt as string),
									"dd/MM/yyyy, HH:mm",
								)}
							</span>
						</p>
						<p className="grid">
							<span className="font-semibold">PAGAMENTO</span>
							<span className="text-muted-foreground font-normal">
								Cartão
							</span>
						</p>
					</div>

					<Separator className="h-0.5 rounded-sm" />

					{order.items?.map((item) => <Product item={item} />)}

					<div className="text-muted-foreground grid gap-3 py-4 text-sm font-semibold">
						<Separator className="h-0.5 rounded-sm" />
						<span className="flex justify-between">
							<span>Subtotal</span>
							<span>R$ {total.toFixed(2)}</span>
						</span>
						<Separator className="h-0.5 rounded-sm" />
						<span className="flex justify-between">
							<span>Entrega</span>
							<span>GRÁTIS</span>
						</span>
						<Separator className="h-0.5 rounded-sm" />
						<span className="flex justify-between">
							<span>Descontos</span>
							<span>R$ {total.toFixed(2)}</span>
						</span>
						<Separator className="h-0.5 rounded-sm" />
						<span className="flex justify-between text-lg text-white">
							<span>TOTAL</span>
							<span>R$ {total.toFixed(2)}</span>
						</span>
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
