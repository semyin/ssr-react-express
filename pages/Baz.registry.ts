import { registerQuery } from '#/query/queryRegistry';

// 为Bar页面注册查询
registerQuery('/baz/:id',  (params) => ({
  queryKey: ['baz', params?.id],
  queryFn: async () => {
    console.log('[SSR] 预取Baz页面数据');
    return { info: "Baz page data from server" + params?.id + ' 人大师傅士大夫2323323' };
  }
}));
