import { Skeleton } from "@/components/ui/skeleton";

export function Loading() {
	return Array.from({ length: 6 }).map(() => (
		<Skeleton className="h-[74px] w-full" />
	));
}
