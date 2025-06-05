import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form as F,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { $api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { RotateCw } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

export default function Form() {
	const navigate = useNavigate();
	const schema = z.object({
		fullName: z
			.string()
			.nonempty({ message: "O nome completo é obrigatório." }),
		cpf: z.string().nonempty({ message: "O CPF é obrigatório." }),
		email: z.string().email({ message: "O e-mail é inválido." }),
		phone: z
			.string()
			.nonempty({ message: "O telefone é obrigatório." })
			.length(11, {
				message: "O telefone deve ter 11 dígitos.",
			}),
		genderId: z.string().nonempty({ message: "O gênero é obrigatório." }),
		password: z.string().nonempty({ message: "A senha é obrigatória." }),
	});

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			fullName: "",
			cpf: "",
			email: "",
			phone: "",
			genderId: "",
			password: "",
		},
	});

	const { mutate, isPending } = $api.useMutation("post", "/identity/user");

	const onSubmit = (values: z.infer<typeof schema>) =>
		mutate(
			{ body: { 
                ...values,
                cpf: values.cpf.replace(/\D/g, ""),
             } },
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
				onSuccess: (data) => {
					toast.success("Sucesso!", {
						description: "Sua conta foi criada com sucesso.",
					});
					navigate("/sign-in", {
						state: { email: data.email },
					});
				},
			},
		);

	return (
		<F {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid place-items-center gap-y-4"
			>
				<div className="grid gap-2 pb-4 text-center">
					<h1 className="text-3xl font-bold">Criar conta</h1>
					<p className="text-muted-foreground text-balance">
						Insira suas informações para criar uma conta
					</p>
				</div>

				<div className="grid w-full items-start gap-4 sm:grid-cols-2">
					<FormField
						control={form.control}
						name="fullName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nome completo (*)</FormLabel>
								<FormControl>
									<Input
										placeholder="Nathan Ferreira"
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
						name="cpf"
						render={({ field }) => (
							<FormItem>
								<FormLabel>CPF (*)</FormLabel>
								<FormControl>
									<Input
										placeholder="12345678910"
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
						name="email"
						render={({ field }) => (
							<FormItem className="col-span-2">
								<FormLabel>E-mail (*)</FormLabel>
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
						name="phone"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Telefone (*)</FormLabel>
								<FormControl>
									<Input
										placeholder="11962506450"
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
						name="genderId"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Gênero</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
									disabled={isPending}
								>
									<FormControl>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Selecione um gênero" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Gênero</SelectLabel>
											<SelectItem value="Masculino">
												Masculino
											</SelectItem>
											<SelectItem value="Feminino">
												Feminino
											</SelectItem>
											<SelectItem value="Outro">
												Outro
											</SelectItem>
											<SelectItem value="Não especificado">
												Não especificado
											</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Senha (*)</FormLabel>
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

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirmar senha (*)</FormLabel>
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
				</div>

				<div className="grid w-full gap-2">
					<p className="text-muted-foreground text-sm">
						(**) As opções &quot;Masculino&quot; e
						&quot;Feminino&quot; abrangem cisgêneros e transgêneros.
						A opção &quot;Outro&quot; inclui gênero fluido,
						não-binário, queer, intersexo e outras identidades de
						gênero. Utilize a opção &quot;Não especificado&quot;
						caso não queira preencher esse campo ou não encontre a
						opção que mais se identifica.
					</p>
					<p className="text-muted-foreground text-sm">
						(*) Campos obrigatórios
					</p>
					<div className="flex items-center space-x-2">
						<Checkbox
							id="recebeOfertas"
							name="recebeOfertas"
							disabled={isPending}
						/>
						<Label htmlFor="recebeOfertas">
							Quero receber ofertas e novidades por e-mail da
							plataforma TechCommerce
							<span className="text-primary font-semibold"></span>
						</Label>
					</div>

					<div className="items-top flex space-x-2">
						<Checkbox id="termos" disabled={isPending} />
						<Label htmlFor="termos" className="grid">
							<span>Aceitar termos e condições</span>
							<span className="text-muted-foreground font-normal">
								Você concorda com nossos{" "}
								<Link
									to=""
									className="text-primary hover:underline"
								>
									Termos de Serviço e Privacidade Política
								</Link>
								.
							</span>
						</Label>
					</div>
				</div>

				<Button
					type="submit"
					size="lg"
					className="w-full"
					disabled={isPending}
				>
					{isPending ? (
						<>
							<RotateCw className="animate-spin" size={20} />
							<span className="ml-2">Enviando...</span>
						</>
					) : (
						"Criar conta"
					)}
				</Button>
			</form>
		</F>
	);
}
