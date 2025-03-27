import { QueryClient } from '@tanstack/react-query';

// 创建一个可以在客户端和服务端共享的 QueryClient 实例
export function getQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // SSR 相关的默认配置
        staleTime: 60 * 1000, // 数据保持新鲜时间
        refetchOnWindowFocus: false, // 窗口聚焦时不重新请求
        retry: false, // 失败时不重试
      },
    },
  });
}
