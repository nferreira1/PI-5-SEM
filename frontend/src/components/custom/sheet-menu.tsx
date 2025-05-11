import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/hooks";
import { ListOrdered, LogOut, User2 } from "lucide-react";
import { Link } from "react-router";

export function SheetMenu() {
	const { logout } = useAuth();

	const links = [
		// { href: "/perfil", label: "Perfil", icon: User2 },
		{ href: "/orders", label: "Meus pedidos", icon: ListOrdered },
	];

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline" size="icon">
					<User2 size={20} />
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="flex flex-col gap-0">
				<SheetHeader className="border-b">
					<SheetTitle>Menu</SheetTitle>
				</SheetHeader>
				<div className="flex grow flex-col justify-between space-y-2 p-4">
					<div>
						{links.map(({ href, label, icon: Icon }) => (
							<Button
								key={href}
								variant="ghost"
								className="w-full justify-start space-x-2 px-4"
								size="lg"
								asChild
							>
								<Link to={href}>
									<Icon size={20} />
									<span>{label}</span>
								</Link>
							</Button>
						))}
					</div>

					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button
								className="w-full justify-start space-x-2 px-4"
								variant="ghost"
								size="lg"
							>
								<LogOut size={20} className="rotate-180" />
								<span>Sair</span>
							</Button>
						</AlertDialogTrigger>

						<AlertDialogContent className="w-min rounded-lg">
							<AlertDialogHeader>
								<AlertDialogTitle className="text-center font-bold">
									Sair
								</AlertDialogTitle>
								<AlertDialogDescription className="text-muted-foreground text-center">
									Deseja mesmo efetuar o logout?
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter className="mt-2 flex-row items-center justify-center gap-2">
								<AlertDialogCancel className="mt-0 w-[134px]">
									Voltar
								</AlertDialogCancel>
								<AlertDialogAction
									className="bg-destructive hover:bg-destructive/90 w-[134px]"
									onClick={logout}
								>
									Sair
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			</SheetContent>
		</Sheet>
	);
}
