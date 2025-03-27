import { registerQuery } from '#/query/queryRegistry';

// 为Bar页面注册查询
registerQuery('/bar', (params) => ({
  queryKey: ['bar', params?.id],
  queryFn: async () => {
    console.log('[SSR] 预取Bar页面数据');
    return { info: "Bar page data from server" };
  }
}));
