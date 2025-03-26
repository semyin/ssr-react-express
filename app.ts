/// <reference types="vite/client" />

import express from "express";
import httpDevServer from "vavite/http-dev-server";
import viteDevServer from "vavite/vite-dev-server";

const app = express();

if (import.meta.env.PROD) {
    // Serve client assets in production
    app.use(express.static("dist/client"));
}

if (viteDevServer) {
    httpDevServer!.on("request", app);
} else {
    console.log("Starting production server");
    app.listen(3000);
}
