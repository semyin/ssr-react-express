import { registerQuery } from '../queryRegistry';

// 为Foo页面注册查询
registerQuery('/foo', {
  queryKey: ['foo', 'data'],
  queryFn: async () => {
    console.log('[SSR] 预取Foo页面数据');
    return { items: ["Foo Item 1", "Foo Item 2", "Foo Item 3"] };
  }
});

// 支持带参数的路由路径
registerQuery('/foo/:id', {
  queryKey: ['foo', 'detail'],
  queryFn: async () => {
    console.log('[SSR] 预取Foo详情页数据');
    return { detail: "Foo详情数据" };
  }
});
