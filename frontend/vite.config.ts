import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import path from "path";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const env = {
		...loadEnv(mode, process.cwd()),
		...dotenv.config({ path: `../.env.${mode}` }).parsed,
	};

	return {
		preview: {
			host: "0.0.0.0",
		},
		define: {
			env,
		},
		plugins: [react(), tailwindcss()],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
	};
});
