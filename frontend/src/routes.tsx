import { AuthProvider, CartProvider } from "@/hooks";
import {
	AuthLayout,
	Categories,
	Category,
	Home,
	NonAuthLayout,
	NotFound,
	Orders,
	Product,
	SignIn,
	SignUp,
} from "@/pages";
import { BrowserRouter, Route, Routes as RouterRoutes } from "react-router";

export function Routes() {
	return (
		<BrowserRouter>
			<RouterRoutes>
				<Route element={<AuthProvider />}>
					<Route element={<CartProvider />}>
						<Route element={<AuthLayout />}>
							<Route path="/orders" element={<Orders />} />
						</Route>

						<Route element={<NonAuthLayout />}>
							<Route path="/" element={<Home />} />
							<Route
								path="/categories"
								element={<Categories />}
							/>
							<Route
								path="/categories/:categoryId"
								element={<Category />}
							/>
							<Route
								path="/products/:productId"
								element={<Product />}
							/>
							<Route path="/sign-in" element={<SignIn />} />
							<Route path="/sign-up" element={<SignUp />} />
						</Route>

						<Route path="*" element={<NotFound />} />
					</Route>
				</Route>
			</RouterRoutes>
		</BrowserRouter>
	);
}
