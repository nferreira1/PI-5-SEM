import { SheetMenu } from "@/components/custom/sheet-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks";
import { ShoppingCart, User2 } from "lucide-react";
import { Link } from "react-router";

export function Header() {
	const { user } = useAuth();

	return (
		<header className="border-b">
			<div className="mx-auto flex min-h-20 max-w-screen-xl items-center justify-between px-5">
				<Link to="/">
					<h1 className="text-primary text-xl font-bold">
						Tech
						<span className="text-foreground font-semibold">
							Commerce
						</span>
					</h1>
				</Link>

				<div className="hidden items-baseline gap-6 font-semibold md:flex">
					<Button
						variant="ghost"
						className="text-base hover:bg-transparent"
						asChild
					>
						<Link to="/">Início</Link>
					</Button>
					<p className="text-muted text-2xl font-bold">|</p>
					<Button
						variant="ghost"
						className="text-base hover:bg-transparent"
						asChild
					>
						<Link to="/categories">Categorias</Link>
					</Button>
				</div>

				<div className="flex gap-2">
					{!user ? (
						<Link to="/sign-in">
							<Button variant="outline" size="icon">
								<User2 size={20} />
							</Button>
						</Link>
					) : (
						<SheetMenu />
					)}
					<Link to="/carrinho">
						<Button
							variant="outline"
							size="icon"
							className="inline-flex lg:hidden"
						>
							<ShoppingCart size={20} />
						</Button>
					</Link>

					{/* <SheetCarrinho /> */}
				</div>
			</div>
		</header>
	);
}
