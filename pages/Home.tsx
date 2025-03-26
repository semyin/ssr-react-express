import { useQuery } from '@tanstack/react-query';

export default function Home() {
  // 使用 useQuery hook 获取数据
  // 这个查询会在服务端预取，并在客户端水合
  const { data, isLoading, error } = useQuery({
    queryKey: ['api', 'message'],
    queryFn: async () => {
      // 在客户端和服务器上工作的获取数据方法
      const response = await fetch('/api');
      if (!response.ok) {
        throw new Error('网络请求失败');
      }
      return response.json();
    },
  });

  return (
    <div>
      <h1>首页</h1>
      {isLoading ? (
        <p>加载中...</p>
      ) : error ? (
        <p>错误: {(error as Error).message}</p>
      ) : (
        <div>
          <p>消息: {data?.message}</p>
        </div>
      )}
    </div>
  );
}
