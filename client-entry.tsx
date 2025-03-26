import { hydrateRoot } from "react-dom/client";
import { StrictMode } from 'react'
import { BrowserRouter } from "react-router";
import { Root } from "./_root";
import { QueryProvider } from "./QueryProvider";

function render() {

	const root = document.getElementById("root") as HTMLElement;
	// 从全局变量获取服务端传递的状态
	const dehydratedState = window.__REACT_QUERY_STATE__;

	hydrateRoot(
		root,
		<StrictMode>
			<QueryProvider dehydratedState={dehydratedState}>
				<BrowserRouter>
					<Root />
				</BrowserRouter>
			</QueryProvider>
		</StrictMode>
	);
}

render();

declare global {
	interface Window {
		__staticRouterHydrationData: any;
		__REACT_QUERY_STATE__: any; // 添加 React Query 状态类型声明
	}
}
