import type { paths } from "@/api";
import { env } from "@/lib/env";
import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";

const fetchClient = createFetchClient<paths>({
	baseUrl: env.VITE_API_URL,
});

export const api = fetchClient;
export const $api = createClient(fetchClient);
