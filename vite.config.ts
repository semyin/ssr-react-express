import { defineConfig } from "vite";
import { vavite } from "vavite";
import react from "@vitejs/plugin-react";
// import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

export default defineConfig({
	buildSteps: [
		{
			name: "client",
			config: {
				build: {
					outDir: "dist/client",
					manifest: true,
					rollupOptions: { input: "client-entry.tsx" },
				},
			},
		},
		{
			name: "server",
			config: {
				build: {
					ssr: true,
					outDir: "dist/server",
				},
			},
		},
	],

	plugins: [
		// TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
		react(),
		vavite({
			serverEntry: "/server-entry.tsx",
			serveClientAssetsInDev: true,
			// Don't reload when dynamically imported dependencies change
			reloadOn: "static-deps-change",
		}),
	],
});
