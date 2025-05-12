import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth, useCart } from "@/hooks";
import { $api } from "@/lib/api";
import { query } from "@/lib/query";
import {
	ChevronLeft,
	ChevronRight,
	Loader2,
	ShoppingCart,
	Trash2,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

export function SheetCart() {
	const navigate = useNavigate();
	const { token } = useAuth();
	const { cart, update, remove, removeAll } = useCart();

	const { mutate, isPending } = $api.useMutation("post", "/order/orders");

	const handleCheckout = () => {
		mutate(
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: {
					items: cart.items?.map(({ product, amount }) => ({
						productId: product?.productId,
						quantity: amount,
						unitPrice: product?.price,
					})),
				},
			},
			{
				onSuccess: () => {
					removeAll();
					query.invalidateQueries({
						queryKey: ["get", "/order/orders"],
					});
					toast.success("Sucesso!", {
						description: "Pedido realizado com sucesso.",
					});
					navigate("/orders");
				},
			},
		);
	};

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className="relative hidden lg:flex"
				>
					<ShoppingCart size={20} />
					<div className="bg-primary absolute -bottom-2 -left-2 flex h-5 w-5 items-center justify-center rounded-full">
						<span className="text-xs font-semibold">
							{cart.items?.length}
						</span>
					</div>
				</Button>
			</SheetTrigger>
			<SheetContent side="right" className="flex flex-col gap-0">
				<SheetHeader className="border-b">
					<SheetTitle>Carrinho</SheetTitle>
				</SheetHeader>
				<div className="flex grow flex-col justify-between px-5 pb-4">
					{cart.items?.length === 0 ? (
						<section className="flex grow items-center justify-center">
							<p>O seu carrinho está vazio.</p>
						</section>
					) : (
						<>
							<section className="flex h-2/6 flex-col gap-2 overflow-auto pt-4">
								{cart.items?.map(({ product, amount }) => (
									<div
										key={product?.productId}
										className="flex w-full gap-3 pt-0.5"
									>
										<Link
											to={`/products/${product?.productId}`}
										>
											<div className="bg-muted flex h-24 w-24 items-center justify-center rounded-md">
												<img
													src={
														product?.images?.find(
															(img) =>
																img.principal,
														)?.url
													}
													alt={product?.name}
													width={0}
													height={0}
													className="size-16 object-contain"
												/>
											</div>
										</Link>
										<div className="flex flex-col justify-between">
											<div>
												<h6 className="truncate text-sm">
													{product?.name}
												</h6>
												<div className="flex items-baseline gap-2">
													<h4 className="text-lg font-bold">
														R$ {product.price}
													</h4>
												</div>
											</div>
											<div className="flex items-center gap-4">
												<Button
													onClick={() =>
														update({
															product,
															amount: amount - 1,
														})
													}
													size="icon"
													variant="outline"
												>
													<ChevronLeft size={18} />
												</Button>
												<span className="text-sm">
													{amount}
												</span>
												<Button
													onClick={() =>
														update({
															product,
															amount: amount + 1,
														})
													}
													size="icon"
													variant="outline"
												>
													<ChevronRight size={18} />
												</Button>

												<Button
													size="icon"
													variant="destructive"
													onClick={() =>
														remove(product)
													}
												>
													<Trash2 size={18} />
												</Button>
											</div>
										</div>
									</div>
								))}
							</section>
							<section className="flex grow flex-col justify-between">
								<div className="text-muted-foreground grid gap-3 py-4 text-sm font-semibold">
									<Separator className="h-0.5 rounded-sm" />
									<span className="flex justify-between">
										<span>Subtotal</span>
										<span>
											R${" "}
											{cart.items
												?.reduce(
													(
														acc,
														{ product, amount },
													) =>
														acc +
														(product?.price as number) *
															amount,
													0,
												)
												.toFixed(2)}
										</span>
									</span>
									<Separator className="h-0.5 rounded-sm" />
									<span className="flex justify-between">
										<span>Entrega</span>
										<span>GRÁTIS</span>
									</span>
									<Separator className="h-0.5 rounded-sm" />
									<span className="flex justify-between">
										<span>Descontos</span>
										<span>
											- R${" "}
											{cart.items
												?.reduce(
													(
														acc,
														{ product, amount },
													) =>
														acc +
														(product?.price as number) *
															amount,
													0,
												)
												.toFixed(2)}
										</span>
									</span>
									<Separator className="h-0.5 rounded-sm" />
									<span className="flex justify-between text-lg text-white">
										<span>TOTAL</span>
										<span>
											R${" "}
											{cart.items
												?.reduce(
													(
														acc,
														{ product, amount },
													) =>
														acc +
														(product?.price as number) *
															amount,
													0,
												)
												.toFixed(2)}
										</span>
									</span>
								</div>
								<Button
									disabled={isPending}
									onClick={handleCheckout}
								>
									{!isPending ? (
										<Loader2 className="animate-spin" />
									) : (
										"FINALIZAR COMPRA"
									)}
								</Button>
							</section>
						</>
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
}
