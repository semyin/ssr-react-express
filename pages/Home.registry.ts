import { registerQuery } from '#/query/queryRegistry';

// 为Home页面注册查询
registerQuery('/', {
  queryKey: ['api', 'message'],
  queryFn: async () => {
    // 在服务端运行时
    // 这里可以直接调用API或数据库，无需通过HTTP请求
    console.log('[SSR] 预取Home页面数据');
    return { message: "Hello from the API!" };
  }
});
