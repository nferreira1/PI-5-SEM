import { config } from "dotenv";
import { resolve } from "path";
import { z } from "zod";

if (Bun.env.NODE_ENV === "development")
	config({ path: resolve(__dirname, `../../../.env.${Bun.env.MODE}`) });

const envVariables = z.object({
	AWS_SQS_QUEUE_ENDPOINT: z.string(),
	AWS_ACCESS_KEY_ID: z.string(),
	AWS_SECRET_ACCESS_KEY: z.string(),
	AWS_DEFAULT_REGION: z.string(),
	EMAIL_SERVICE_QUEUE_URL: z.string(),
	EMAIL_SERVICE_EMAIL_USER: z.string(),
	EMAIL_SERVICE_EMAIL_PASS: z.string(),
});

const { error } = envVariables.safeParse(Bun.env);

if (error) throw new Error("Erro na validação das variáveis de ambiente");

export type Env = z.infer<typeof envVariables>;

export const env: Env = Bun.env as unknown as Env;
