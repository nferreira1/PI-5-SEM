import { Outlet } from "react-router";

export default function NonAuthLayout() {
	return (
		<div className="flex min-h-svh flex-col antialiased">
			<Outlet />
		</div>
	);
}
