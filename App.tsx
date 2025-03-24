import { ReactNode } from "react";
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Outlet } from "@tanstack/react-router";

export function App() {
	return (
		<>
			<div className="app-container">
				<Outlet />
			</div>
			<TanStackRouterDevtools />
		</>
	);
}
