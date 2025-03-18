import * as fs from "fs";
import { isErrorResult, merge, MergeInput } from "openapi-merge";

async function main() {
	const specs: { oas: unknown; pathModification: { prepend: string } }[] = [];

	try {
		const response = await fetch("http://localhost:8001/services");
		const data = await response.json();

		for (const service of data.data) {
			try {
				const serviceUrl = `http://localhost:8000/${service.name}/api-docs`;
				console.log(`Buscando OpenAPI de: ${serviceUrl}`);

				const response = await fetch(serviceUrl);
				if (!response.ok)
					throw new Error(`Erro HTTP ${response.status}`);

				const spec = await response.json();

				specs.push({
					oas: spec,
					pathModification: {
						prepend: `/${service.name}`,
					},
				});
			} catch (error) {
				console.error(
					`Erro ao buscar OpenAPI de ${service.name}:`,
					error,
				);
			}
		}
	} catch (e) {
		console.error("Erro ao obter lista de serviços do Kong:", e);
	}

	console.log("Especificações coletadas:", specs);

	const mergeResult = merge(specs as MergeInput);

	if (isErrorResult(mergeResult)) {
		console.error(
			`Erro ao mesclar: ${mergeResult.message} (${mergeResult.type})`,
		);
	} else {
		console.log("Mesclagem bem-sucedida! Salvando em swagger.json...");

		fs.writeFileSync(
			"swagger.json",
			JSON.stringify(mergeResult.output, null, 2),
		);

		console.log("Arquivo salvo com sucesso: swagger.json");
	}
}

main();
