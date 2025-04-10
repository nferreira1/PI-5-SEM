import { AuthProvider } from "@/hooks";
import {
	Categories,
	Category,
	Home,
	NonAuthLayout,
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
					<Route element={<NonAuthLayout />}>
						<Route path="/" element={<Home />} />
						<Route path="/categories" element={<Categories />} />
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
				</Route>
			</RouterRoutes>
		</BrowserRouter>
	);
}
