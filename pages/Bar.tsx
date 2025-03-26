import { useQuery } from '@tanstack/react-query';

// 定义返回数据的类型接口
interface BarData {
  info: string;
}

export default function Bar() {
  // 使用 useQuery hook 获取数据
  const { data, isLoading, error } = useQuery<BarData>({
    queryKey: ['bar', 'data'],
    queryFn: async () => {
      // 在服务端已经预取了数据，这个函数在客户端可能不会执行
      return new Promise<BarData>((resolve) => {
        setTimeout(() => {
          resolve({ info: "Bar page data from server" });
        }, 300);
      });
    },
  });

  return (
    <div>
      <h1>Bar 页面</h1>
      <h2>React Query 服务端渲染示例</h2>
      
      {isLoading ? (
        <p>加载中...</p>
      ) : error ? (
        <p>错误: {(error as Error).message}</p>
      ) : (
        <div>
          <h3>信息:</h3>
          <p>{data?.info}</p>
          <p>注意：这个数据是从服务端预取的，在初始渲染时不会有加载状态</p>
        </div>
      )}
    </div>
  );
}
