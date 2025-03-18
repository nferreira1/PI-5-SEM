import "@tanstack/react-table";
import { components } from "./api.d";

declare global {
	type Schema = components["schemas"];
}

declare module "@tanstack/react-table" {
	interface ColumnMeta {
		[key: string]: unknown;
	}
}
