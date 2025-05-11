import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export default function NotFound() {
	return (
		<main className="mx-auto flex h-screen max-w-screen-sm flex-col items-center justify-center px-4 text-center">
			<Link to="/" className="mb-6">
				<h1 className="text-primary text-4xl font-bold">
					Tech
					<span className="text-foreground font-semibold">
						Commerce
					</span>
				</h1>
			</Link>

			<h1 className="text-primary text-sm font-bold">404</h1>

			<h2 className="text-2xl font-bold sm:text-5xl">
				Esta página não existe!
			</h2>

			<h6 className="text-muted-foreground mb-6 text-xs sm:text-lg">
				Desculpe, mas não conseguimos encontrar a página que procura.
			</h6>

			<Button variant="link" asChild>
				<Link to="/" className="flex items-center">
					<ArrowLeft size={18} />
					<h6 className="ml-1">Voltar para página inicial</h6>
				</Link>
			</Button>
		</main>
	);
}
