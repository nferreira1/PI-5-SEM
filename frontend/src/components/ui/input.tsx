import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import * as React from "react";

const usePasswordVisibility = () => {
	const [visible, setVisible] = React.useState(false);
	const toggleVisibility = React.useCallback(
		() => setVisible((prev) => !prev),
		[],
	);
	return { visible, toggleVisibility };
};

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
	const { visible, toggleVisibility } = usePasswordVisibility();
	const inputType = type === "password" && visible ? "text" : type;

	return (
		<div className="relative">
			<input
				type={inputType}
				data-slot="input"
				className={cn(
					"file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-10 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
					"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
					"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
					className,
				)}
				{...props}
			/>

			{type === "password" && (
				<Button
					type="button"
					size="icon"
					variant="ghost"
					onClick={toggleVisibility}
					className="absolute top-0 right-0 size-10 rounded-r-sm"
					aria-label={visible ? "Hide password" : "Show password"}
				>
					{visible ? (
						<EyeOff className="stroke-current" />
					) : (
						<Eye className="stroke-current" />
					)}
				</Button>
			)}
		</div>
	);
}

export { Input };
