import { hydrateRoot } from "react-dom/client";
import { StrictMode, Suspense } from 'react'
import { RouterProvider } from "react-router/dom";
import { createBrowserRouter } from "react-router";
import { routes } from "./router";

async function render() {
	// Tiny, crappy router
	// const importer = {
	// 	"/": () => import("./pages/Home"),
	// 	"/foo": () => import("./pages/Foo"),
	// 	"/bar": () => import("./pages/Bar"),
	// }[window.location.pathname];

	// if (!importer) {
	// 	throw new Error(`No page found for ${window.location.pathname}`);
	// }

	// const Page = (await importer()).default;

	const root = document.getElementById("root") as HTMLElement;

	let router = createBrowserRouter(routes, {
		// need to ensure this script runs AFTER <StaticRouterProvider> in
		// entry.server.tsx so that window.__staticRouterHydrationData is available
		hydrationData: window.__staticRouterHydrationData,
	});

	hydrateRoot(
		root,
		<StrictMode>
			<RouterProvider router={router} />
		</StrictMode>
	);
}

render();

declare global {
	interface Window {
		__staticRouterHydrationData: any;
	}
}

