import { QueryClientProvider, HydrationBoundary } from '@tanstack/react-query';
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

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        {children}
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
