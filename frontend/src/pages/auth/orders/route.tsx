import { Footer } from "@/components/custom/footer";
import { Header } from "@/components/custom/header";
import { useAuth } from "@/hooks";
import { $api } from "@/lib/api";
import { ShoppingBasket } from "lucide-react";
import { AccordionProducts } from "./components/accordion-products";
import { Loading } from "./loading";

export default function Orders() {
	const { token } = useAuth();

	const { data: orders, isLoading: isLoadingOrders } = $api.useQuery(
		"get",
		"/order/orders",
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	);

	return (
		<>
			<Header />
			<main className="mx-auto w-full max-w-screen-xl grow px-5 py-6">
				<section className="pb-8">
					<div className="border-primary flex w-max items-center space-x-1 rounded-full border-2 px-4 py-1">
						<ShoppingBasket size={20} strokeWidth={2} />
						<span className="text-sm font-semibold">
							MEUS PEDIDOS
						</span>
					</div>
				</section>

				<section className="space-y-4">
					{isLoadingOrders ? (
						<Loading />
					) : (
						orders?.map((order) => (
							<AccordionProducts order={order} />
						))
					)}
				</section>
			</main>
			<Footer />
		</>
	);
}
