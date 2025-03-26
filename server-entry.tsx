
import { renderToString } from "react-dom/server";
import { StrictMode } from "react";
import { StaticRouter } from "react-router";
import { Root } from "./_root";

export function render(url: string) {

    return renderToString(
        <StrictMode>
            <StaticRouter location={url}>
                <Root />
            </StaticRouter>
        </StrictMode>
    )
}

