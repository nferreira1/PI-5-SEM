import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/hooks/use-theme";
import { query } from "@/lib/query";
import { Routes } from "@/routes";
import { QueryClientProvider } from "@tanstack/react-query";

function App() {
	return (
		<QueryClientProvider client={query}>
			<ThemeProvider>
				<Routes />
				<Toaster
					richColors
					swipeDirections={["bottom", "left", "right", "top"]}
				/>
			</ThemeProvider>
		</QueryClientProvider>
	);
}

export default App;
