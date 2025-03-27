import { QueryClient } from '@tanstack/react-query';
import { matchPath, type Params } from 'react-router';

type QueryFn = () => Promise<any>;

interface QueryConfig {
  queryKey: unknown[];
  queryFn: QueryFn;
}

type QueryConfigFactory = (params: Params | undefined) => QueryConfig;

interface RegisteredQuery {
  routePath: string; // 路由路径模式
  queryConfigFactory: QueryConfigFactory;
}

// 存储所有注册的查询
const queryRegistry: RegisteredQuery[] = [];

/**
 * 注册一个与特定路由关联的查询
 * @param routePath 路由路径模式 (支持 react-router 的路径模式)
 * @param queryConfigFactory 查询配置工厂 
 */
export function registerQuery(routePath: string, queryConfigFactory: QueryConfigFactory) {
  queryRegistry.push({
    routePath,
    queryConfigFactory,
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
    matchingQueries.map(({ routePath, queryConfigFactory }) => {
      // 获取动态路由参数
      const match = matchPath(routePath, url);
      const params = match?.params || undefined;
      
      // 使用参数生成查询配置
      const queryConfig = queryConfigFactory(params);
      
      // 预取查询
      return queryClient.prefetchQuery(queryConfig);
    })
  );
}
