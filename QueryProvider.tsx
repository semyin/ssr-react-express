import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { getQueryClient } from './queryClient';

interface QueryProviderProps {
  children: ReactNode;
  dehydratedState?: unknown;
}

// React Query 提供者组件，用于包装整个应用
export function QueryProvider({ children, dehydratedState }: QueryProviderProps) {
  // 获取查询客户端实例
  const queryClient = getQueryClient();

  // 如果存在反序列化状态，则恢复客户端状态
  if (dehydratedState && typeof window !== 'undefined') {
    // 在客户端，我们使用预先获取的数据来初始化缓存
    queryClient.setQueryData(['dehydratedState'], dehydratedState);
  }

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
