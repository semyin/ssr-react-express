/// <reference types="vite/client" />

import express, { Request, Response } from "express";
import httpDevServer from "vavite/http-dev-server";
import viteDevServer from "vavite/vite-dev-server";
import { ComponentType } from "react";
import { renderToString } from "react-dom/server";
import React, { StrictMode, Suspense } from "react";
// import { App } from "./App";
import { createMemoryHistory, RouterProvider } from "@tanstack/react-router";
import { createRouter, router } from "./router";

const app = express();

if (import.meta.env.PROD) {
    // Serve client assets in production
    app.use(express.static("dist/client"));
}

// Page routes
// app.get("/", (req, res) => render(req, res, () => import("./pages/Home")));
// app.get("/foo", (req, res) => render(req, res, () => import("./pages/Foo")));
// app.get("/bar", (req, res) => render(req, res, () => import("./pages/Bar")));

app.get("*", (req, res) => render(req, res));

type PageImporter = () => Promise<{ default: ComponentType }>;

async function render(req: Request, res: Response) {
    // console.log(req.url, req.originalUrl);
    
    // const Page = (await importer()).default;

    let clientEntryPath: string;
    if (viteDevServer) {
        // In development, we can simply refer to the source file name
        clientEntryPath = "/client-entry.tsx";
    } else {
        // In production we'll figure out the path to the client entry file using the manifest
        // @ts-ignore: This only exists after the client build is complete
        const manifest = (await import("./dist/client/.vite/manifest.json"))
            .default;
        clientEntryPath = manifest["client-entry.tsx"].file;

        // In a real application we would also use the manifest to generate
        // preload links for assets needed for the rendered page
    }

    // const router = createRouter();

    const memoryHistory = createMemoryHistory({
        initialEntries: [req.originalUrl]
    })

    router.update({
        history: memoryHistory
    })

    await router.load()

    const routerHtml = renderToString(
        <StrictMode>
            <Suspense fallback={null}>
                <RouterProvider router={router} />
            </Suspense>
        </StrictMode>
    )

    console.log(routerHtml);
    

    let html = `<!DOCTYPE html><html lang="en">
		<head>
			<meta charset="UTF-8">
            <link rel="icon" type="image/svg+xml" href="/vite.svg" />
			<title>SSR React Express</title>
		</head>
		<body>
			<div id="root">${routerHtml}</div>
			<script type="module" src="${clientEntryPath}"></script>
		</body>
	</html>`;

    console.log(html);

    if (viteDevServer) {
        // This will inject the Vite client and React fast refresh in development
        html = await viteDevServer.transformIndexHtml(req.originalUrl, html);
        console.log(html);
        
    }

    res.status(200).send(html);
}

if (viteDevServer) {
    httpDevServer!.on("request", app);
} else {
    console.log("Starting production server");
    app.listen(3000);
}
