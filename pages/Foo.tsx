import { useQuery } from '@tanstack/react-query';

// 定义返回数据的类型接口
interface FooData {
  items: string[];
}

export default function Foo() {
  // 使用 useQuery hook 获取数据，并指定返回数据类型
  const { data, isLoading, error } = useQuery<FooData>({
    queryKey: ['foo', 'data'],
    queryFn: async () => {
      // 在实际项目中，这里可能会调用一个 API 端点
      // 但在这个示例中，服务端进行了预取，所以这里的函数可能不会在客户端执行
      return new Promise<FooData>((resolve) => {
        setTimeout(() => {
          resolve({ items: ["Foo Item 1", "Foo Item 2", "Foo Item 3"] });
        }, 500);
      });
    },
  });

  return (
    <div>
      <h1>Foo 页面</h1>
      <h2>React Query 数据获取示例</h2>
      
      {isLoading ? (
        <p>加载中...</p>
      ) : error ? (
        <p>错误: {(error as Error).message}</p>
      ) : (
        <div>
          <h3>项目列表：</h3>
          <ul>
            {data?.items.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
