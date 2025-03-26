/// <reference types="vite/client" />

import express from "express";
import type { Request, Response } from "express";
import httpDevServer from "vavite/http-dev-server";
import viteDevServer from "vavite/vite-dev-server";
import { render } from "./server-entry";

const app = express();

if (import.meta.env.PROD) {
    // Serve client assets in production
    app.use(express.static("dist/client"));
}

app.get("/api", (req: Request, res: Response) => {
    res.json({ message: "Hello from the API!" });
});

app.get("*", async (req: Request, res: Response) => {

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

    // 使用异步渲染函数，获取 HTML 和查询状态
    const { html: routerHtml, queryState } = await render(req.url);

    // 将查询状态序列化并注入到页面中
    const queryStateScript = queryState 
        ? `<script>window.__REACT_QUERY_STATE = ${JSON.stringify(queryState)};</script>` 
        : '';

    let html = `<!DOCTYPE html><html lang="en">
		<head>
			<meta charset="UTF-8">
            <link rel="icon" type="image/svg+xml" href="/vite.svg" />
			<title>SSR React Express</title>
		</head>
		<body>
			<div id="root">${routerHtml}</div>
			${queryStateScript}
			<script type="module" src="${clientEntryPath}"></script>
		</body>
	</html>`;

    if (viteDevServer) {
        // This will inject the Vite client and React fast refresh in development
        html = await viteDevServer.transformIndexHtml(req.originalUrl, html);

    }

    res.status(200).send(html);

});

if (viteDevServer) {
    httpDevServer!.on("request", app);
} else {
    console.log("Starting production server");
    app.listen(3000);
}
