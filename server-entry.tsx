import { renderToString } from "react-dom/server";
import { StrictMode } from "react";
import { StaticRouter } from "react-router";
import { Root } from "./_root";
import { QueryProvider } from "./QueryProvider";
import { getQueryClient } from "./queryClient";
import { dehydrate } from '@tanstack/react-query';

// 
export async function render(url: string) {
    // 
    const queryClient = getQueryClient();
    
    // 
    await prefetchQueries(url, queryClient);
    
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

// 
async function prefetchQueries(url: string, queryClient: any) {
    // 
    if (url === '/' || url === '') {
        // 
        await queryClient.prefetchQuery({
            queryKey: ['api', 'message'],
            queryFn: async () => {
                // API 
                // 
                console.log(1);
                
                return { message: "Hello from the API!" };
            }
        });
    } else if (url.includes('/foo')) {
        // Foo 
        await queryClient.prefetchQuery({
            queryKey: ['foo', 'data'],
            queryFn: async () => {
                return { items: ["Foo Item 1", "Foo Item 2", "Foo Item 3"] };
            }
        });
    } else if (url.includes('/bar')) {
        // Bar 
        await queryClient.prefetchQuery({
            queryKey: ['bar', 'data'],
            queryFn: async () => {
                return { info: "Bar page data from server" };
            }
        });
    }
}
