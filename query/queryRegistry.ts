import { QueryClient } from '@tanstack/react-query';
import { matchPath } from 'react-router';

type QueryFn = () => Promise<any>;

interface QueryConfig {
  queryKey: unknown[];
  queryFn: QueryFn;
}

interface RegisteredQuery {
  routePath: string; // 路由路径模式
  queryConfig: QueryConfig;
}

// 存储所有注册的查询
const queryRegistry: RegisteredQuery[] = [];

/**
 * 注册一个与特定路由关联的查询
 * @param routePath 路由路径模式 (支持 react-router 的路径模式)
 * @param queryConfig 查询配置 
 */
export function registerQuery(routePath: string, queryConfig: QueryConfig) {
  queryRegistry.push({
    routePath,
    queryConfig,
  });
}

/**
 * 根据当前URL预取所有匹配的已注册查询
 * @param url 当前URL
 * @param queryClient React Query客户端实例
 */
export async function prefetchRegisteredQueries(url: string, queryClient: QueryClient) {
  const matchingQueries = queryRegistry.filter(({ routePath }) => {
    // 使用react-router的matchPath来支持路径参数
    return matchPath(routePath, url);
  });

  console.log(`[SSR] 找到${matchingQueries.length}个匹配路由 '${url}' 的查询`);

  // 并行预取所有匹配的查询
  await Promise.all(
    matchingQueries.map(({ queryConfig }) =>
      queryClient.prefetchQuery(queryConfig)
    )
  );
}
