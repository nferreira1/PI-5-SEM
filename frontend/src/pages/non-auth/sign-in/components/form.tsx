import { Button } from "@/components/ui/button";
import {
	Form as F,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks";
import { $api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

export function Form() {
	const location = useLocation();
	const { login } = useAuth();
	const { mutate, isPending } = $api.useMutation(
		"post",
		"/identity/auth/login",
	);

	const schema = z.object({
		email: z.string().email({ message: "O e-mail é inválido." }),
		password: z.string().nonempty({ message: "A senha é obrigatória." }),
	});

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			email: location.state?.email || "",
			password: "",
		},
	});

	const onSubmit = (values: z.infer<typeof schema>) => {
		mutate(
			{ body: { ...values } },
			{
				onError: (error) => {
					if (error.errors?.length) {
						return error.errors?.forEach((error) => {
							form.setError(error.field as any, {
								message: error.message,
							});
						});
					}

					toast.error("Erro!", {
						description: error.message,
					});
				},
				onSuccess: (success) => login(success?.token as string),
			},
		);
	};

	return (
		<F {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid w-full max-w-sm gap-6"
			>
				<div className="flex flex-col items-center gap-2 text-center">
					<h2 className="text-xl font-bold">
						Bem-vindo ao{" "}
						<Link to="/" className="mb-4">
							<span className="text-primary">
								Tech
								<span className="text-foreground">
									Commerce
								</span>
							</span>
						</Link>
					</h2>
					<p className="text-muted-foreground text-sm">
						Digite seu email e senha abaixo para fazer login em sua
						conta.
					</p>
				</div>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>E-mail</FormLabel>
							<FormControl>
								<Input
									placeholder="user@user.com"
									disabled={isPending}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Senha</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="••••••••"
									disabled={isPending}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="grid gap-4 sm:grid-cols-2 sm:gap-2">
					<Button variant="outline" asChild>
						<Link to="/">
							<ArrowLeft />
							Voltar
						</Link>
					</Button>
					<Button type="submit" disabled={isPending}>
						{isPending ? (
							<Loader2 className="animate-spin" />
						) : (
							"LOGIN"
						)}
					</Button>
				</div>

				<p className="text-center text-sm">
					Não tem uma conta?{" "}
					<Link
						to="/sign-up"
						className="text-primary font-semibold underline"
					>
						Inscreva-se!
					</Link>
				</p>
			</form>
		</F>
	);
}
