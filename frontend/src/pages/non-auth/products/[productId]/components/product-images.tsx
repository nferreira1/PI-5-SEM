import { useState } from "react";

export function ProductImages({
	product,
}: {
	product: Schema["models.Product"] | undefined;
}) {
	const [imageSelected, setImageSelected] = useState<
		Schema["models.ProductImages"]["url"]
	>(product?.images?.find((image) => image.principal)?.url);

	const [isAnimating, setIsAnimating] = useState(false);

	const handleImageSelect = (
		image: Schema["models.ProductImages"]["url"],
	) => {
		setIsAnimating(true);
		setTimeout(() => {
			setImageSelected(image);
			setIsAnimating(false);
		}, 300);
	};

	return (
		<>
			<div className="relative grid h-full w-full place-items-center">
				<img
					src={imageSelected}
					alt={product?.name}
					className={`size-72 object-contain transition-opacity duration-300 ${
						isAnimating ? "opacity-0" : "opacity-100"
					}`}
					width={288}
					height={288}
				/>

				<div className="absolute bottom-8 flex justify-evenly gap-4 md:hidden">
					{product?.images?.map((image) => (
						<button
							key={image.url}
							data-imagem-selecionada={
								imageSelected === image.url
							}
							className="bg-background data-[imagem-selecionada=true]:border-primary flex aspect-square h-20 cursor-pointer items-center justify-center rounded-lg data-[imagem-selecionada=true]:border"
							onClick={() => handleImageSelect(image.url)}
						>
							<img
								src={image.url}
								alt={image.url}
								className="pointer-events-none size-14 object-contain"
								width={56}
								height={56}
							/>
						</button>
					))}
				</div>
			</div>

			<div className="top-8 left-8 hidden flex-col gap-4 md:absolute lg:flex">
				{product?.images?.map((image) => (
					<button
						key={image.url}
						data-imagem-selecionada={imageSelected === image.url}
						className="bg-muted data-[imagem-selecionada=true]:border-primary md:bg-background flex aspect-square h-20 cursor-pointer items-center justify-center rounded-lg data-[imagem-selecionada=true]:border"
						onClick={() => handleImageSelect(image.url)}
					>
						<img
							src={image.url}
							alt={image.url}
							className="pointer-events-none size-14 object-contain"
							width={56}
							height={56}
						/>
					</button>
				))}
			</div>
		</>
	);
}
