import { defineConfig } from "vite";
import { vavite } from "vavite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
	resolve: {
		alias: {
			"#": path.resolve(__dirname),
		},
	},
	buildSteps: [
		{
			name: "client",
			config: {
				build: {
					outDir: "dist/client",
					manifest: true,
					minify: 'terser',
					terserOptions: {
						compress: {
							drop_console: true,
							dead_code: true,
							passes: 2,
						},
					},
					rollupOptions: { 
						input: "./renderer/client-entry.tsx",
						output: {
							manualChunks: (id) => {
								// 依赖库分包
								if (id.includes('node_modules')) {
									// React 核心库分包
									if (id.includes('react/index.js') || id.includes('react/jsx-runtime')) {
										return 'vendor-react-core';
									}
									// React DOM 分包
									if (id.includes('react-dom')) {
										return 'vendor-react-dom';
									}
									// React Router 分包
									if (id.includes('react-router')) {
										return 'vendor-router';
									}
									// React Query 分包
									if (id.includes('@tanstack/react-query')) {
										return 'vendor-query';
									}
									// 其他依赖库
									return 'vendor-others';
								}
								
								// 路由页面分包
								if (id.includes('/pages/')) {
									const pageName = id.split('/pages/')[1].split('.')[0];
									return `page-${pageName}`;
								}
								
								// 组件分包
								if (id.includes('/components/')) {
									return 'components';
								}
								
								// 布局分包
								if (id.includes('/layouts/')) {
									return 'layouts';
								}
							},
							chunkFileNames: 'assets/[name]-[hash].js',
						}
					},
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
		react(),
		vavite({
			serverEntry: "/app.ts",
			serveClientAssetsInDev: true,
			// Don't reload when dynamically imported dependencies change
			reloadOn: "static-deps-change",
		}),
	],
});
