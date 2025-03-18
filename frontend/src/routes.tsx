import { AuthProvider } from "@/hooks";
import { Home, NonAuthLayout, SignIn, SignUp } from "@/pages";
import { BrowserRouter, Route, Routes as RouterRoutes } from "react-router";

export function Routes() {
	return (
		<BrowserRouter>
			<RouterRoutes>
				<Route element={<AuthProvider />}>
					<Route element={<NonAuthLayout />}>
						<Route path="/" element={<Home />} />
						<Route path="/sign-in" element={<SignIn />} />
						<Route path="/sign-up" element={<SignUp />} />
					</Route>
				</Route>
			</RouterRoutes>
		</BrowserRouter>
	);
}
