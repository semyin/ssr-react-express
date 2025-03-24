import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { StrictMode, Suspense } from 'react'
import { RouterProvider,createBrowserHistory } from "@tanstack/react-router";
import { createRouter, router } from "./router";

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

	// const router = createRouter();

	// const history = createBrowserHistory({
	// 	window: window,
	// });

	// router.update({
	// 	history,
	// });

	// await router.load();

	const root = document.getElementById("root") as HTMLElement;

	console.log(root.innerHTML);
	
	hydrateRoot(
		root,
		<StrictMode>
			<Suspense fallback={null}>
				<RouterProvider router={router} />
			</Suspense>
		</StrictMode>
	);
}

render();
