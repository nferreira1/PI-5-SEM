import { z } from "zod";

const envVariables = z.object({
	VITE_API_URL: z.string(),
});

const { error } = envVariables.safeParse(import.meta.env);

if (error) throw new Error("Erro na validação das variáveis de ambiente");

export type Env = z.infer<typeof envVariables>;

export const env: Env = import.meta.env as unknown as Env;
