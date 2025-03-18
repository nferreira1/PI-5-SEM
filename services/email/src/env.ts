import { config } from "dotenv";
import { resolve } from "path";
import { z } from "zod";

if (Bun.env.NODE_ENV === "development") config({ path: resolve(__dirname, `../../../.env.${Bun.env.MODE}`) });

const envVariables = z.object({
	EMAIL_SERVICE_QUEUE_NAME: z.string(),
	RABBITMQ_HOST: z.union([z.literal("localhost"), z.literal("rabbitmq")]),
	RABBITMQ_USER: z.string(),
	RABBITMQ_PASS: z.string(),
	EMAIL_USER: z.string(),
	EMAIL_PASS: z.string(),
});

const { error } = envVariables.safeParse(Bun.env);

if (error) throw new Error("Erro na validação das variáveis de ambiente");

export type Env = z.infer<typeof envVariables>;

export const env: Env = Bun.env as unknown as Env;
