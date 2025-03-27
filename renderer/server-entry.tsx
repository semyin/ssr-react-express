import { renderToString } from "react-dom/server";
import { StrictMode } from "react";
import { StaticRouter } from "react-router";
import { Root } from "./_root";
import { QueryProvider } from "#/query/QueryProvider";
import { getQueryClient } from "#/query/queryClient";
import { dehydrate } from '@tanstack/react-query';
import { prefetchRegisteredQueries } from '#/query/queryRegistry';

// 导入所有注册的查询
import '#/query/queryRegistrations';

// 
export async function render(url: string) {
    // 
    const queryClient = getQueryClient();
    
    // 使用注册表系统预取查询
    await prefetchRegisteredQueries(url, queryClient);
    
    // 
    const dehydratedState = dehydrate(queryClient);

    // HTML
    const html = renderToString(
        <StrictMode>
            <QueryProvider dehydratedState={dehydratedState}>
                <StaticRouter location={url}>
                    <Root />
                </StaticRouter>
            </QueryProvider>
        </StrictMode>
    )

    // HTML 
    return {
        html,
        queryState: dehydratedState
    };
}
