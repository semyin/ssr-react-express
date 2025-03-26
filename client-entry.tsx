import { hydrateRoot } from "react-dom/client";
import { StrictMode } from 'react'
import { BrowserRouter } from "react-router";
import { Root } from "./_root";

function render() {

	const root = document.getElementById("root") as HTMLElement;

	hydrateRoot(
		root,
		<StrictMode>
			<BrowserRouter>
				<Root />
			</BrowserRouter>
		</StrictMode>
	);
}

render();

declare global {
	interface Window {
		__staticRouterHydrationData: any;
	}
}

