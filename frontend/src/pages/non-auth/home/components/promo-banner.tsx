import { cn } from "@/lib/utils";
import { Link, To } from "react-router";

export function Banner({
	image,
	discount,
	category,
	className,
	to,
	invert,
	...props
}: React.HTMLAttributes<HTMLElement> &
	Readonly<{
		image: string;
		discount: number;
		category: string;
		to: To;
		invert?: boolean;
	}>) {
	return (
		<section className={cn("pt-8", className)} {...props}>
			<Link to={to}>
				<div
					data-invert={invert}
					className="flex h-40 w-full items-center justify-around rounded-xl bg-gradient-to-r from-[#36393C] to-[#36393C]/30 px-5 data-[invert=true]:bg-gradient-to-l sm:h-52 sm:justify-evenly"
				>
					<img
						src={image}
						alt="image"
						width={175}
						height={175}
						className="object-cover"
					/>

					<span className="grid leading-tight">
						<span className="text-lg font-thin">até</span>
						<span>
							<span className="text-primary text-5xl leading-7 font-extrabold">
								{discount}%
							</span>
							<span className="font-thin"> de</span>
						</span>
						<span className="text-3xl leading-7 font-bold">
							Desconto
						</span>
						<span className="font-thin">em {category}</span>
					</span>
				</div>
			</Link>
		</section>
	);
}
